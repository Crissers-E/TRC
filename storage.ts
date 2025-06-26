import { applications, users, type Application, type InsertApplication, type User, type InsertUser } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-http";

export interface IStorage {
  // Application methods
  getApplications(): Promise<Application[]>;
  getApplication(id: number): Promise<Application | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  deleteApplication(id: number): Promise<boolean>;

  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private applications: Map<number, Application>;
  private users: Map<number, User>;
  private currentApplicationId: number;
  private currentUserId: number;

  constructor() {
    this.applications = new Map();
    this.users = new Map();
    this.currentApplicationId = 1;
    this.currentUserId = 1;

    // Create default admin user
    this.createUser({
      username: "Admin",
      password: "Admin123!\"#"
    });
  }

  async getApplications(): Promise<Application[]> {
    return Array.from(this.applications.values()).sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
  }

  async getApplication(id: number): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.currentApplicationId++;
    const application: Application = {
      ...insertApplication,
      id,
      phone: insertApplication.phone || null,
      skills: insertApplication.skills || null,
      submittedAt: new Date()
    };
    this.applications.set(id, application);
    return application;
  }

  async deleteApplication(id: number): Promise<boolean> {
    return this.applications.delete(id);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();