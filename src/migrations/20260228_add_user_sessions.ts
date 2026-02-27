import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

// Adds the users_sessions table required by Payload v3 auth,
// which was missing from the initial migration.
export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "users_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"expires_at" timestamp(3) with time zone
);

CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "users_sessions" ("_order");
CREATE INDEX IF NOT EXISTS "users_sessions_parent_idx" ON "users_sessions" ("_parent_id");

DO $$ BEGIN
 ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_users_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
DROP TABLE IF EXISTS "users_sessions";
`);
};
