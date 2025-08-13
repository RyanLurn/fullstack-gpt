import { db } from "@/database";
import { chat } from "@/database/schemas/chat";
import { generateUuid } from "@/lib/generateUuid";

async function createChat({ userId }: { userId: string }) {
  const id = generateUuid();
  await db.insert(chat).values({ id, userId });
  return id;
}

export { createChat };
