import { drizzle } from "drizzle-orm/libsql";
import * as authSchema from "@/database/schemas/auth";
import * as chatSchema from "@/database/schemas/chat";
import { serverEnv } from "@/lib/env/server";

const db = drizzle(serverEnv.DB_FILE_NAME, {
  schema: { ...authSchema, ...chatSchema }
});

export { db };
