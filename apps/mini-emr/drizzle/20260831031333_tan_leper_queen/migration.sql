CREATE TABLE "appointment" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"provider" text NOT NULL,
	"datetime" text NOT NULL,
	"repeat" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dosage" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medication" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "modal_confg" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"config" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prescription" (
	"id" serial PRIMARY KEY,
	"user_id" integer NOT NULL,
	"medication" text NOT NULL,
	"dosage" text NOT NULL,
	"refill_on" text NOT NULL,
	"refill_schedule" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "appointments" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "prescriptions" integer NOT NULL;--> statement-breakpoint
CREATE SEQUENCE "user_id_seq";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq')--> statement-breakpoint
ALTER SEQUENCE "user_id_seq" OWNED BY "public"."user"."id";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE int USING "id"::int;--> statement-breakpoint
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id");--> statement-breakpoint
ALTER TABLE "prescription" ADD CONSTRAINT "prescription_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id");