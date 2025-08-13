import type { UIDataTypes, UIMessagePart, UITools } from "ai";
import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "@/database/helpers/timestamps";
import { userId } from "@/database/helpers/user-id";

const chat = sqliteTable("chat", {
  id: text("id").primaryKey(),
  name: text("name"),
  userId,
  ...timestamps
});

const message = sqliteTable("message", {
  id: text("id").primaryKey(),
  role: text("role", { enum: ["system", "user", "assistant"] }).notNull(),
  metadata: text("metadata", { mode: "json" }),
  parts: text("parts", { mode: "json" })
    .notNull()
    .$type<Array<UIMessagePart<UIDataTypes, UITools>>>(),
  chatId: text("chat_id")
    .notNull()
    .references(() => chat.id, { onDelete: "cascade" }),
  userId,
  ...timestamps
});

const chatRelations = relations(chat, ({ many }) => ({
  messages: many(message)
}));

const messageRelations = relations(message, ({ one }) => ({
  chat: one(chat, {
    fields: [message.chatId],
    references: [chat.id]
  })
}));

export { chat, message, chatRelations, messageRelations };
