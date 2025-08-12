import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/features/auth";
import { Chat } from "@/features/chat/components/chat";
import { getChat } from "@/features/chat/db-operations/get-chat";

export default async function ChatPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect("/sign-in");
  }
  const { id } = await params;
  const chat = await getChat({ id, userId: session.user.id });
  return <Chat id={chat.id} initialMessages={chat.messages} />;
}
