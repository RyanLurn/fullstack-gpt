// This is a mock protected page to test auth
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/features/auth";
import { UserButton } from "@/features/auth/components/user-button";

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const isUserProfileOpen = (await searchParams)["userProfile"] === "open";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="fixed top-3 right-3">
        <UserButton
          isUserProfileOpen={isUserProfileOpen}
          name={session.user.name}
          image={session.user.image}
          email={session.user.email}
          emailVerified={session.user.emailVerified}
        />
      </div>
      <h1>Welcome {session.user.name}</h1>
    </div>
  );
}
