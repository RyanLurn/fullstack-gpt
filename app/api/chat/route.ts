import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { convertToModelMessages, streamText } from "ai";
import { APIError } from "better-auth/api";
import * as z from "zod";
import { db } from "@/database";
import { message } from "@/database/schemas/chat";
import { auth } from "@/features/auth";
import { groq } from "@/features/chat/ai/groq";
import { getChat } from "@/features/chat/db-operations/get-chat";
import { messageInsertSchema } from "@/features/chat/utils/validators";
import { generateUuid } from "@/lib/generateUuid";

const requestBodySchema = z.object({
  chatId: z.string(),
  newMessage: messageInsertSchema.omit({ chatId: true, userId: true })
});

export async function POST(req: Request) {
  try {
    // Authentication check
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const body = (await req.json().catch(error => {
      console.error("Failed to parse request body: ", error);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    })) as z.infer<typeof requestBodySchema>;

    // Validate request body
    const parsedBody = requestBodySchema.safeParse(body);
    if (!parsedBody.success) {
      const errorTree = z.treeifyError(parsedBody.error);
      console.error("Invalid request body: ", errorTree);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { chatId, newMessage } = parsedBody.data;

    // Authorization check + get existing messages
    const chat = await getChat({
      id: chatId,
      userId: session.user.id
    });

    // Save user's newly sent message
    await db.insert(message).values({
      ...newMessage,
      chatId: chat.id,
      userId: session.user.id
    });

    // Get AI's streaming response
    const messages = [...chat.messages, newMessage];
    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      messages: convertToModelMessages(messages),
      onError: ({ error }) => {
        console.error("AI Error: ", error);
      }
    });

    // Stream AI's response
    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      generateMessageId: generateUuid,
      onFinish: async ({ responseMessage }) => {
        await db.insert(message).values({
          ...responseMessage,
          chatId: chat.id,
          userId: session.user.id
        });
      }
    });
  } catch (error) {
    // Auth error handling
    if (error instanceof APIError) {
      console.error(
        `Better Auth Error: "${error.message}" with status "${error.status}".`
      );
    }

    console.error("Unexpected error: ", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
