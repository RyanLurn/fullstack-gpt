import { createChat } from "@/features/chat/db-operations/create-chat";

export default async function ChatPage() {
  await createChat();
}
