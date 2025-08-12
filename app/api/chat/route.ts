import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { type UIMessage, convertToModelMessages, streamText } from "ai";
import { APIError } from "better-auth/api";
import { db } from "@/database";
import { message } from "@/database/schemas/chat";
import { auth } from "@/features/auth";
import { groq } from "@/features/chat/ai/groq";
import { getChat } from "@/features/chat/db-operations/get-chat";
import { generateUuid } from "@/lib/generateUuid";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Authentication check
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { chatId, newMessage }: { chatId: string; newMessage: UIMessage } =
      await req.json();

    // Authorization check + get existing messages
    const chat = await getChat({ id: chatId, userId: session.user.id });

    // Save user's newly sent message
    await db
      .insert(message)
      .values({ ...newMessage, chatId, userId: session.user.id });

    // Get AI's streaming response
    const messages = [...chat.messages, newMessage];
    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      messages: convertToModelMessages(messages),
      onError: ({ error }) => {
        console.error("AI Error: ", error);
      }
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      generateMessageId: generateUuid,
      onFinish: async ({ responseMessage }) => {
        await db.insert(message).values({
          ...responseMessage,
          chatId,
          userId: session.user.id
        });
      }
    });
  } catch (error) {
    if (error instanceof APIError) {
      console.error(
        `Better Auth Error: "${error.message}" with status "${error.status}".`
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
