import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Smilish Group Content Tables

export const fashionProducts = mysqlTable("fashion_products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  price: int("price"),
  discount: int("discount"),
  category: varchar("category", { length: 100 }),
  fabric: varchar("fabric", { length: 100 }),
  sizes: text("sizes"), // JSON array
  colors: text("colors"), // JSON array
  stock: int("stock"),
  sku: varchar("sku", { length: 100 }),
  mainImage: varchar("mainImage", { length: 500 }),
  galleryImages: text("galleryImages"), // JSON array
  featured: int("featured").default(0),
  status: mysqlEnum("status", ["draft", "published", "out_of_stock", "archived"]).default("draft"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type FashionProduct = typeof fashionProducts.$inferSelect;
export type InsertFashionProduct = typeof fashionProducts.$inferInsert;

export const properties = mysqlTable("properties", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  price: int("price"),
  location: varchar("location", { length: 255 }),
  state: varchar("state", { length: 100 }),
  city: varchar("city", { length: 100 }),
  area: varchar("area", { length: 100 }),
  type: varchar("type", { length: 100 }),
  transactionType: mysqlEnum("transactionType", ["for_sale", "for_rent", "lease", "investment"]),
  bedrooms: int("bedrooms"),
  bathrooms: int("bathrooms"),
  landSize: varchar("landSize", { length: 100 }),
  features: text("features"), // JSON array
  images: text("images"), // JSON array
  floorPlan: varchar("floorPlan", { length: 500 }),
  video: varchar("video", { length: 500 }),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  documentation: varchar("documentation", { length: 100 }),
  agentPhone: varchar("agentPhone", { length: 20 }),
  status: mysqlEnum("status", ["available", "reserved", "sold", "rented", "unavailable"]).default("available"),
  featured: int("featured").default(0),
  published: int("published").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  category: mysqlEnum("category", ["fashion", "ai", "realestate"]),
  clientName: varchar("clientName", { length: 255 }),
  images: text("images"), // JSON array
  date: timestamp("date"),
  featured: int("featured").default(0),
  status: mysqlEnum("status", ["draft", "published"]).default("draft"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

export const aiServices = mysqlTable("ai_services", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  features: text("features"), // JSON array
  industries: text("industries"), // JSON array
  pricingType: varchar("pricingType", { length: 100 }),
  images: text("images"), // JSON array
  caseStudy: text("caseStudy"),
  featured: int("featured").default(0),
  status: mysqlEnum("status", ["draft", "published"]).default("draft"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type AIService = typeof aiServices.$inferSelect;
export type InsertAIService = typeof aiServices.$inferInsert;

export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  branch: varchar("branch", { length: 100 }),
  service: varchar("service", { length: 255 }),
  source: varchar("source", { length: 100 }),
  status: mysqlEnum("status", ["new", "contacted", "qualified", "proposal", "converted", "lost", "archived"]).default("new"),
  date: timestamp("date").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  branch: varchar("branch", { length: 100 }),
  service: varchar("service", { length: 255 }),
  message: text("message"),
  read: int("read").default(0),
  date: timestamp("date").defaultNow(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

export const inspectionRequests = mysqlTable("inspection_requests", {
  id: int("id").autoincrement().primaryKey(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 255 }),
  propertyId: int("propertyId"),
  date: timestamp("date"),
  time: varchar("time", { length: 50 }),
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled", "rescheduled"]).default("pending"),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
});

export type InspectionRequest = typeof inspectionRequests.$inferSelect;
export type InsertInspectionRequest = typeof inspectionRequests.$inferInsert;

export const mediaLibrary = mysqlTable("media_library", {
  id: int("id").autoincrement().primaryKey(),
  filename: varchar("filename", { length: 255 }).notNull(),
  url: varchar("url", { length: 500 }).notNull(),
  key: varchar("key", { length: 255 }).notNull(),
  mimeType: varchar("mimeType", { length: 100 }),
  size: int("size"),
  altText: varchar("altText", { length: 255 }),
  description: text("description"),
  uploadedBy: int("uploadedBy"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type MediaLibrary = typeof mediaLibrary.$inferSelect;
export type InsertMediaLibrary = typeof mediaLibrary.$inferInsert;
