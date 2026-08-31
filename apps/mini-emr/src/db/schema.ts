import { integer, serial, text, pgTable } from "drizzle-orm/pg-core";

export const patient = pgTable("patient", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  appointments: integer("appointments").notNull(),
  prescriptions: integer("prescriptions").notNull(),
});

export const appointment = pgTable("appointment", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => patient.id),
  provider: text("provider").notNull(),
  datetime: text("datetime").notNull(),
  repeat: text("repeat").notNull(),
});

export const prescription = pgTable("prescription", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => patient.id),
  medication: text("medication").notNull(),
  dosage: text("dosage").notNull(),
  quantity: integer("quantity").notNull(),
  refill_on: text("refill_on").notNull(),
  refill_schedule: text("refill_schedule").notNull(),
});

export const medication = pgTable("medication", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const dosage = pgTable("dosage", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const modalConfig = pgTable("modal_confg", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  config: text("config").notNull(),
});
