"use server";

import { db } from "@/db/drizzle";
import { appointment, prescription, patient } from "@/db/schema";
import { Patient } from "@/types/tableTypes";
import { inArray } from "drizzle-orm";

export async function getPatients() {
  return await db.select().from(patient);
}

export async function addPatient(inputUser: Omit<Patient, "id" | "appointments" | "prescriptions">) {
  const newPatient = { ...inputUser, prescriptions: 0, appointments: 0 };
  await db.insert(patient).values(newPatient);
}

export async function getPatientsAppointments(userIds: number[]) {
  return await db.select().from(appointment).where(inArray(appointment.patientId, userIds));
}

export async function getPatientsPrescriptions(userIds: number[]) {
  return await db.select().from(prescription).where(inArray(prescription.patientId, userIds));
}
