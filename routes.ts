import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertApplicationSchema, adminLoginSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Submit application
  app.post("/api/applications", async (req, res) => {
    try {
      const validatedData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(validatedData);
      res.json({ success: true, application });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit application" 
        });
      }
    }
  });

  // Get all applications (admin only)
  app.get("/api/applications", async (req, res) => {
    try {
      const applications = await storage.getApplications();
      res.json(applications);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch applications" 
      });
    }
  });

  // Get single application (admin only)
  app.get("/api/applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const application = await storage.getApplication(id);
      
      if (!application) {
        return res.status(404).json({ 
          success: false, 
          message: "Application not found" 
        });
      }
      
      res.json(application);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch application" 
      });
    }
  });

  // Delete application (admin only)
  app.delete("/api/applications/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteApplication(id);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false, 
          message: "Application not found" 
        });
      }
      
      res.json({ success: true, message: "Application deleted" });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete application" 
      });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = adminLoginSchema.parse(req.body);
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ 
          success: false, 
          message: "Invalid credentials" 
        });
      }
      
      res.json({ success: true, message: "Login successful" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Login failed" 
        });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
