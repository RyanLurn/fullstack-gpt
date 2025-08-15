"use server";

import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/database";
import { chat } from "@/database/schemas/chat";
import { auth } from "@/features/auth";
import { appLogger } from "@/lib/logger";

async function getChat({ id }: { id: string }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    appLogger.warn("Unauthorized attempt to get a chat via Server Action.");
    redirect("/sign-in");
  }

  appLogger.info(
    { userId: session.user.id },
    "Getting chat via Server Action."
  );
  const foundChat = await db.query.chat.findFirst({
    where: and(eq(chat.id, id), eq(chat.userId, session.user.id)),
    with: {
      messages: true
    }
  });

  if (foundChat === undefined) {
    appLogger.error(
      `Chat with id "${id}" not found or user "${session.user.id}" does not have access.`
    );
    notFound();
  }

  return foundChat;
}

export { getChat };
