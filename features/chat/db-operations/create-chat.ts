import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/database";
import { chat } from "@/database/schemas/chat";
import { auth } from "@/features/auth";
import { generateUuid } from "@/lib/generateUuid";
import { appLogger } from "@/lib/logger";

async function createChat() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    appLogger.warn(
      "Unauthorized attempt to create a new chat via Server Action."
    );
    redirect("/sign-in");
  }

  appLogger.info(
    { userId: session.user.id },
    "Creating new chat via Server Action."
  );
  const id = generateUuid();
  await db.insert(chat).values({ id, userId: session.user.id });

  redirect(`/chat/${id}`);
}

export { createChat };
