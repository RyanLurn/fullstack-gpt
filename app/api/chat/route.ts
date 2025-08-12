import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { type UIMessage, convertToModelMessages, streamText } from "ai";
import { auth } from "@/features/auth";
import { groq } from "@/features/chat/ai/groq";
import { getChat } from "@/features/chat/db-operations/get-chat";

export const maxDuration = 30;

export async function POST(req: Request) {
  // Authentication check
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { id, message }: { id: string; message: UIMessage } =
      await req.json();

    // Authorization check + get existing messages
    const chat = await getChat({ id, userId: session.user.id });

    const messages = [...chat.messages, message];
    const result = streamText({
      model: groq("llama-3.1-8b-instant"),
      messages: convertToModelMessages(messages)
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
