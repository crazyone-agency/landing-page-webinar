import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { webinarRegistrationSchema } from "@shared/schema";
import { ZodError } from "zod";

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

  const httpServer = createServer(app);

  return httpServer;
}
