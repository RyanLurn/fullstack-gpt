import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "@/database/helpers/timestamps";

const task = sqliteTable("task", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  ...timestamps
});

export { task };
