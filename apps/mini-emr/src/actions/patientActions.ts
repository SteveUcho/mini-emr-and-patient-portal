"use server";

import { db } from "@/db/drizzle";
import { appointment, prescription, patient } from "@/db/schema";
import { Appointment, Patient, Prescription } from "@/types/tableTypes";
import { inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getPatients() {
  return await db.select().from(patient);
}

export async function addPatient(inputUser: Omit<Patient, "id" | "appointments" | "prescriptions">) {
  const newPatient = { ...inputUser, prescriptions: 0, appointments: 0 };
  await db.insert(patient).values(newPatient);
  revalidatePath("/");
}

export async function getPatientsAppointments(patientIds: number[]) {
  console.log("Getting appointments for patient IDs:", patientIds);
  return await db.select().from(appointment).where(inArray(appointment.patientId, patientIds));
}

export async function getPatientsPrescriptions(patientIds: number[]) {
  return await db.select().from(prescription).where(inArray(prescription.patientId, patientIds));
}

export async function addPatientAppointment(appointmentData: Appointment) {
  await db.insert(appointment).values(appointmentData);
  revalidatePath("/");
}

export async function addPatientPrescription(prescriptionData: Prescription) {
  await db.insert(prescription).values(prescriptionData);
  revalidatePath("/");
}
