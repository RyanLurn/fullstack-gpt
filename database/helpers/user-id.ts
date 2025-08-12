import { text } from "drizzle-orm/sqlite-core";
import { user } from "@/database/schemas/auth";

const userId = text("user_id")
  .notNull()
  .references(() => user.id, { onDelete: "cascade" });

export { userId };
