import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "settings"
      RENAME COLUMN "default_seo_title" TO "default_s_e_o_title";
    ALTER TABLE "settings"
      RENAME COLUMN "default_seo_description" TO "default_s_e_o_description";
  `)
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
    ALTER TABLE "settings"
      RENAME COLUMN "default_s_e_o_title" TO "default_seo_title";
    ALTER TABLE "settings"
      RENAME COLUMN "default_s_e_o_description" TO "default_seo_description";
  `)
}
