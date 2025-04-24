import { 
  users, 
  type User, 
  type InsertUser, 
  type WebinarRegistration,
  type WebinarRegistrationRecord,
  type InsertWebinarRegistration,
  type CourseInquiryRecord,
  type InsertCourseInquiry
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
  
  // Add course inquiry methods
  createCourseInquiry(inquiry: InsertCourseInquiry): Promise<CourseInquiryRecord>;
  getCourseInquiryByEmail(email: string): Promise<CourseInquiryRecord | undefined>;
  getAllCourseInquiries(): Promise<CourseInquiryRecord[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private webinarRegistrations: Map<number, WebinarRegistrationRecord>;
  private courseInquiries: Map<number, CourseInquiryRecord>;
  private currentUserId: number;
  private currentRegistrationId: number;
  private currentInquiryId: number;

  constructor() {
    this.users = new Map();
    this.webinarRegistrations = new Map();
    this.courseInquiries = new Map();
    this.currentUserId = 1;
    this.currentRegistrationId = 1;
    this.currentInquiryId = 1;
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
    // Ensure gdprConsent is always boolean to fix type error
    const newRegistration: WebinarRegistrationRecord = { 
      ...registration, 
      id,
      gdprConsent: !!registration.gdprConsent
    };
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
  
  // Course inquiry methods
  async createCourseInquiry(inquiry: InsertCourseInquiry): Promise<CourseInquiryRecord> {
    const id = this.currentInquiryId++;
    const newInquiry: CourseInquiryRecord = { 
      ...inquiry, 
      id,
      gdprConsent: !!inquiry.gdprConsent,
      message: inquiry.message || null 
    };
    this.courseInquiries.set(id, newInquiry);
    return newInquiry;
  }
  
  async getCourseInquiryByEmail(email: string): Promise<CourseInquiryRecord | undefined> {
    return Array.from(this.courseInquiries.values()).find(
      (inquiry) => inquiry.email === email,
    );
  }
  
  async getAllCourseInquiries(): Promise<CourseInquiryRecord[]> {
    return Array.from(this.courseInquiries.values());
  }
}

export const storage = new MemStorage();
