import { db } from "@/db/drizzle";
import { medication } from "@/db/schema";

export async function getMedications() {
  const res = await db.select().from(medication);
  return res.map((medication) => medication.name);
}
