import { 
  users, 
  type User, 
  type InsertUser, 
  type WebinarRegistration,
  type WebinarRegistrationRecord,
  type InsertWebinarRegistration
} from "@shared/schema";

// Extend the storage interface with new methods
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Add webinar registration methods
  createWebinarRegistration(registration: InsertWebinarRegistration): Promise<WebinarRegistrationRecord>;
  getWebinarRegistrationByEmail(email: string): Promise<WebinarRegistrationRecord | undefined>;
  getAllWebinarRegistrations(): Promise<WebinarRegistrationRecord[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private webinarRegistrations: Map<number, WebinarRegistrationRecord>;
  private currentUserId: number;
  private currentRegistrationId: number;

  constructor() {
    this.users = new Map();
    this.webinarRegistrations = new Map();
    this.currentUserId = 1;
    this.currentRegistrationId = 1;
  }

  // Original user methods
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

  // Webinar registration methods
  async createWebinarRegistration(registration: InsertWebinarRegistration): Promise<WebinarRegistrationRecord> {
    const id = this.currentRegistrationId++;
    const newRegistration: WebinarRegistrationRecord = { ...registration, id };
    this.webinarRegistrations.set(id, newRegistration);
    return newRegistration;
  }

  async getWebinarRegistrationByEmail(email: string): Promise<WebinarRegistrationRecord | undefined> {
    return Array.from(this.webinarRegistrations.values()).find(
      (registration) => registration.email === email,
    );
  }

  async getAllWebinarRegistrations(): Promise<WebinarRegistrationRecord[]> {
    return Array.from(this.webinarRegistrations.values());
  }
}

export const storage = new MemStorage();
