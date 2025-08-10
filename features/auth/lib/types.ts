import type { auth } from "@/features/auth";

type UserType = typeof auth.$Infer.Session.user;

export type { UserType };
