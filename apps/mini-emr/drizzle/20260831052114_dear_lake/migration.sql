ALTER TABLE "user" RENAME TO "patient";--> statement-breakpoint
ALTER TABLE "appointment" RENAME COLUMN "user_id" TO "patient_id";--> statement-breakpoint
ALTER TABLE "prescription" RENAME COLUMN "user_id" TO "patient_id";--> statement-breakpoint
ALTER TABLE "prescription" ADD COLUMN "quantity" integer NOT NULL;