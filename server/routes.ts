import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { webinarRegistrationSchema, courseInquirySchema } from "@shared/schema";
import { ZodError } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for webinar registrations
  app.post("/api/webinar/register", async (req, res) => {
    try {
      // Validate the request body
      const registrationData = webinarRegistrationSchema.parse(req.body);
      
      // Store the registration
      const registration = await storage.createWebinarRegistration({
        ...registrationData,
        registeredAt: new Date().toISOString(),
      });

      return res.status(201).json({
        success: true,
        message: "Registration successful",
        data: registration
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      }

      return res.status(500).json({
        success: false,
        message: "An error occurred while processing your registration"
      });
    }
  });

  // Get all webinar registrations (admin only, in a real app you'd add auth middleware)
  app.get("/api/webinar/registrations", async (_req, res) => {
    try {
      const registrations = await storage.getAllWebinarRegistrations();
      return res.status(200).json({
        success: true,
        data: registrations
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching registrations"
      });
    }
  });

  // API route for course inquiries
  app.post("/api/course/inquiry", async (req, res) => {
    try {
      // Validate the request body
      const inquiryData = courseInquirySchema.parse(req.body);
      
      // Store the inquiry
      const inquiry = await storage.createCourseInquiry({
        ...inquiryData,
        inquiryDate: new Date().toISOString(),
      });

      return res.status(201).json({
        success: true,
        message: "Richiesta di informazioni inviata con successo",
        data: inquiry
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Errore di validazione",
          errors: error.errors
        });
      }

      console.error("Course inquiry error:", error);

      return res.status(500).json({
        success: false,
        message: "Si è verificato un errore durante l'elaborazione della tua richiesta"
      });
    }
  });

  // Get all course inquiries (admin only, in a real app you'd add auth middleware)
  app.get("/api/course/inquiries", async (_req, res) => {
    try {
      const inquiries = await storage.getAllCourseInquiries();
      return res.status(200).json({
        success: true,
        data: inquiries
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching course inquiries"
      });
    }
  });

  // Stripe payment route for one-time payments
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "L'importo deve essere positivo"
        });
      }
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "eur",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      
      return res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret
      });
    } catch (error: any) {
      console.error("Stripe error:", error);
      return res.status(500).json({ 
        success: false,
        message: "Errore durante la creazione dell'intento di pagamento",
        error: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
