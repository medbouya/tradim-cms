import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

// Fixes two column naming issues:
// 1. media.thumbnail_u_r_l – Payload v3 auto-adds thumbnailURL to upload collections,
//    which maps to thumbnail_u_r_l (each capital letter becomes its own snake_case word).
// 2. products.downloadable_p_d_f_id – Payload v3 toSnakeCase converts downloadablePDF
//    to downloadable_p_d_f (not downloadable_pdf), so the FK column name is wrong.
export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "thumbnail_u_r_l" varchar;

ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "products_downloadable_pdf_id_media_id_fk";
ALTER TABLE "products" RENAME COLUMN "downloadable_pdf_id" TO "downloadable_p_d_f_id";

DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_downloadable_p_d_f_id_media_id_fk" FOREIGN KEY ("downloadable_p_d_f_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

ALTER TABLE "products" DROP CONSTRAINT IF EXISTS "products_downloadable_p_d_f_id_media_id_fk";
ALTER TABLE "products" RENAME COLUMN "downloadable_p_d_f_id" TO "downloadable_pdf_id";

DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_downloadable_pdf_id_media_id_fk" FOREIGN KEY ("downloadable_pdf_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "media" DROP COLUMN IF EXISTS "thumbnail_u_r_l";
`);
};
