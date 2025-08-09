// This is a mock protected page to test auth
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/features/auth";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <h1>Welcome {session.user.name}</h1>
    </div>
  );
}
