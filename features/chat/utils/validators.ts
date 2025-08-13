import { createInsertSchema } from "drizzle-zod";
import * as z from "zod";
import { message } from "@/database/schemas/chat";

const messageInsertSchema = createInsertSchema(message);

type MessageInsertSchema = z.infer<typeof messageInsertSchema>;

export { messageInsertSchema };
export type { MessageInsertSchema };
