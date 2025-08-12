import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/database";
import { chat } from "@/database/schemas/chat";

async function getChat({ id, userId }: { id: string; userId: string }) {
  const result = await db.select().from(chat).where(eq(chat.id, id));
  const foundChat = result[0];

  if (foundChat === undefined) {
    notFound();
  }

  if (foundChat.userId !== userId) {
    console.error(
      `User with id "${userId}" requested chat with id "${id}", but it does not belong to them.`
    );
    notFound();
  }

  return foundChat.id;
}

export { getChat };
