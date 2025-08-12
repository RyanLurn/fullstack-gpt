import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/features/auth";
import { getChat } from "@/features/chat/lib/utils/get-chat";

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
  const chatId = await getChat({ id, userId: session.user.id });
  return <div>Chat {chatId}</div>;
}
