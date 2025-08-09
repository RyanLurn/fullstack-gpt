import { drizzle } from "drizzle-orm/libsql";
import { serverEnv } from "@/lib/env/server";

const db = drizzle(serverEnv.DB_FILE_NAME);

export { db };
