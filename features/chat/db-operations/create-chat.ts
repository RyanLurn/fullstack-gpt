import { v7 as uuidv7 } from "uuid";
import { db } from "@/database";
import { chat } from "@/database/schemas/chat";

async function createChat({ userId }: { userId: string }) {
  const id = uuidv7();
  await db.insert(chat).values({ id, userId });
  return id;
}

export { createChat };
