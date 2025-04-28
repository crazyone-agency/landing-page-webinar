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

// Funzione di utilità per creare o aggiornare i prodotti in Stripe
async function setupStripeProducts() {
  try {
    console.log("Configurazione prodotti Stripe...");
    
    // Prodotto 1: Smart Revolution Sprint (€37)
    let smartRevolutionProduct;
    const smartRevolutionProductsSearch = await stripe.products.search({
      query: "name:'Smart Revolution Sprint'",
    });
    
    if (smartRevolutionProductsSearch.data.length > 0) {
      smartRevolutionProduct = smartRevolutionProductsSearch.data[0];
      console.log("Prodotto Smart Revolution Sprint già esistente:", smartRevolutionProduct.id);
    } else {
      smartRevolutionProduct = await stripe.products.create({
        name: "Smart Revolution Sprint",
        description: "Workshop di 60 minuti con Salvatore Garufi",
        images: ["https://sgpeople.it/wp-content/uploads/2024/11/Foto-Ufficiale.png"],
        metadata: {
          type: "workshop",
          durationMinutes: "60"
        }
      });
      console.log("Nuovo prodotto Smart Revolution Sprint creato:", smartRevolutionProduct.id);
    }
    
    // Creare/Aggiornare il prezzo del prodotto
    let smartRevolutionPrice;
    const smartRevolutionPrices = await stripe.prices.list({
      product: smartRevolutionProduct.id,
      active: true,
    });
    
    if (smartRevolutionPrices.data.length > 0) {
      smartRevolutionPrice = smartRevolutionPrices.data[0];
      console.log("Prezzo Smart Revolution Sprint già esistente:", smartRevolutionPrice.id);
    } else {
      smartRevolutionPrice = await stripe.prices.create({
        product: smartRevolutionProduct.id,
        unit_amount: 3700, // €37 in centesimi
        currency: 'eur',
      });
      console.log("Nuovo prezzo Smart Revolution Sprint creato:", smartRevolutionPrice.id);
    }
    
    // Prodotto 2: Percorso Formativo in Sviluppo Personale (€4.000)
    let sviluppoPersonaleProduct;
    const sviluppoPersonaleProductsSearch = await stripe.products.search({
      query: "name:'Percorso Formativo in Sviluppo Personale'",
    });
    
    if (sviluppoPersonaleProductsSearch.data.length > 0) {
      sviluppoPersonaleProduct = sviluppoPersonaleProductsSearch.data[0];
      console.log("Prodotto Percorso Formativo già esistente:", sviluppoPersonaleProduct.id);
    } else {
      sviluppoPersonaleProduct = await stripe.products.create({
        name: "Percorso Formativo in Sviluppo Personale",
        description: "Percorso formativo completo con Salvatore Garufi",
        images: ["https://sgpeople.it/wp-content/uploads/2024/11/Foto-Ufficiale.png"],
        metadata: {
          type: "corso",
          discountedFrom: "8000"
        }
      });
      console.log("Nuovo prodotto Percorso Formativo creato:", sviluppoPersonaleProduct.id);
    }
    
    // Creare/Aggiornare il prezzo del prodotto
    let sviluppoPersonalePrice;
    const sviluppoPersonalePrices = await stripe.prices.list({
      product: sviluppoPersonaleProduct.id,
      active: true,
    });
    
    if (sviluppoPersonalePrices.data.length > 0) {
      sviluppoPersonalePrice = sviluppoPersonalePrices.data[0];
      console.log("Prezzo Percorso Formativo già esistente:", sviluppoPersonalePrice.id);
    } else {
      sviluppoPersonalePrice = await stripe.prices.create({
        product: sviluppoPersonaleProduct.id,
        unit_amount: 400000, // €4000 in centesimi
        currency: 'eur',
      });
      console.log("Nuovo prezzo Percorso Formativo creato:", sviluppoPersonalePrice.id);
    }
    
    return {
      smartRevolution: { product: smartRevolutionProduct, price: smartRevolutionPrice },
      sviluppoPersonale: { product: sviluppoPersonaleProduct, price: sviluppoPersonalePrice }
    };
  } catch (error) {
    console.error("Errore durante la configurazione dei prodotti Stripe:", error);
    throw error;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Inizializza i prodotti Stripe
  try {
    await setupStripeProducts();
  } catch (error) {
    console.error("Errore inizializzazione Stripe:", error);
  }
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

  // Endpoint per ottenere prodotti e prezzi da Stripe
  app.get("/api/stripe/products", async (_req, res) => {
    try {
      const products = await setupStripeProducts();
      return res.status(200).json({
        success: true,
        data: {
          smartRevolution: {
            productId: products.smartRevolution.product.id,
            priceId: products.smartRevolution.price.id,
            amount: (products.smartRevolution.price.unit_amount || 3700) / 100, // Converti da centesimi a euro
            name: products.smartRevolution.product.name,
            description: products.smartRevolution.product.description
          },
          sviluppoPersonale: {
            productId: products.sviluppoPersonale.product.id,
            priceId: products.sviluppoPersonale.price.id,
            amount: (products.sviluppoPersonale.price.unit_amount || 400000) / 100, // Converti da centesimi a euro
            name: products.sviluppoPersonale.product.name,
            description: products.sviluppoPersonale.product.description
          }
        }
      });
    } catch (error: any) {
      console.error("Errore nel recupero dei prodotti Stripe:", error);
      return res.status(500).json({
        success: false,
        message: "Errore nel recupero dei prodotti",
        error: error.message
      });
    }
  });

  // API per creare un pagamento Smart Revolution Sprint
  app.post("/api/checkout/workshop", async (_req, res) => {
    try {
      const products = await setupStripeProducts();
      const priceId = products.smartRevolution.price.id;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 3700, // €37.00
        currency: "eur",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          product_id: products.smartRevolution.product.id,
          product_name: "Smart Revolution Sprint"
        },
        description: "Smart Revolution Sprint - Workshop di 60 minuti"
      });
      
      return res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        amount: 37,
        productName: "Smart Revolution Sprint"
      });
    } catch (error: any) {
      console.error("Stripe error:", error);
      return res.status(500).json({ 
        success: false,
        message: "Errore durante la creazione dell'intento di pagamento per il workshop",
        error: error.message 
      });
    }
  });
  
  // API per creare un pagamento Percorso Formativo
  app.post("/api/checkout/course", async (_req, res) => {
    try {
      const products = await setupStripeProducts();
      const priceId = products.sviluppoPersonale.price.id;
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 400000, // €4000.00
        currency: "eur",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          product_id: products.sviluppoPersonale.product.id,
          product_name: "Percorso Formativo in Sviluppo Personale",
          original_price: "8000"
        },
        description: "Percorso Formativo in Sviluppo Personale - Corso completo"
      });
      
      return res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
        amount: 4000,
        productName: "Percorso Formativo in Sviluppo Personale"
      });
    } catch (error: any) {
      console.error("Stripe error:", error);
      return res.status(500).json({ 
        success: false,
        message: "Errore durante la creazione dell'intento di pagamento per il corso",
        error: error.message 
      });
    }
  });
  
  // Stripe payment route for generic one-time payments (maintained for backward compatibility)
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, productType } = req.body;
      
      if (!amount || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: "L'importo deve essere positivo"
        });
      }
      
      let description = "Pagamento generico";
      let metadata = {};
      
      if (productType === 'workshop') {
        description = "Smart Revolution Sprint - Workshop di 60 minuti";
        metadata = {
          product_type: "workshop",
          product_name: "Smart Revolution Sprint"
        };
      } else if (productType === 'course') {
        description = "Percorso Formativo in Sviluppo Personale - Corso completo";
        metadata = {
          product_type: "course",
          product_name: "Percorso Formativo in Sviluppo Personale",
          original_price: "8000"
        };
      }
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "eur",
        automatic_payment_methods: {
          enabled: true,
        },
        description,
        metadata
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
