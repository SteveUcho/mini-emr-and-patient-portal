"use server";

import { db } from "@/db/drizzle";
import { appointment, prescription, patient } from "@/db/schema";
import { Appointment, Patient, Prescription } from "@/types/tableTypes";
import { eq, inArray } from "drizzle-orm";
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

export async function deletePatientPrescription({ id }: Partial<Prescription>) {
  if (!id) return;
  await db.delete(prescription).where(eq(prescription.id, id));
  revalidatePath("/");
}

export async function deletePatientAppointment({ id }: Partial<Appointment>) {
  if (!id) return;
  await db.delete(appointment).where(eq(appointment.id, id));
  revalidatePath("/");
}

export async function editPatientAppointment({ id, ...data }: Partial<Appointment>) {
  if (!id) return;
  await db.update(appointment).set(data).where(eq(appointment.id, id));
  revalidatePath("/");
}

export async function editPatientPrescription({ id, ...data }: Partial<Prescription>) {
  if (!id) return;
  await db.update(prescription).set(data).where(eq(prescription.id, id));
  revalidatePath("/");
}
