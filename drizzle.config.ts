import { getFullEnv } from '@/env/configs';
import { defineConfig } from 'drizzle-kit';

const { databaseFile, drizzleMigrationsFolder, drizzleSchemaFiles } =
  getFullEnv();

export default defineConfig({
  schema: drizzleSchemaFiles,
  out: drizzleMigrationsFolder,
  dialect: 'sqlite',
  dbCredentials: {
    url: databaseFile,
  },
});
