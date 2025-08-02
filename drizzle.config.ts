import { defineConfig } from "drizzle-kit";
import { serverEnv } from "@/lib/env/server";

export default defineConfig({
  out: "./database/migrations",
  schema: "./database/schemas",
  dialect: "sqlite",
  dbCredentials: {
    url: serverEnv.DB_FILE_NAME
  }
});
