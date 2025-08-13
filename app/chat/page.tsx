import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/features/auth";
import { createChat } from "@/features/chat/db-operations/create-chat";

export default async function ChatPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const id = await createChat({ userId: session.user.id });
  redirect(`/chat/${id}`);
}
