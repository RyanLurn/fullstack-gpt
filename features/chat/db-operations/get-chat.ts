import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/database";
import { chat } from "@/database/schemas/chat";

async function getChat({ id, userId }: { id: string; userId: string }) {
  const foundChat = await db.query.chat.findFirst({
    where: and(eq(chat.id, id), eq(chat.userId, userId)),
    with: {
      messages: true
    }
  });

  if (foundChat === undefined) {
    console.error(
      `Chat with id "${id}" not found or user "${userId}" does not have access.`
    );
    notFound();
  }

  return foundChat;
}

export { getChat };
