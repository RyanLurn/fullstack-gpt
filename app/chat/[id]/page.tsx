import { Chat } from "@/features/chat/components/chat";
import { getChat } from "@/features/chat/db-operations/get-chat";

export default async function ChatPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chat = await getChat({ id });
  return <Chat id={chat.id} initialMessages={chat.messages} />;
}
