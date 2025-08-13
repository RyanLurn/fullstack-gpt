import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/database";
import { account, session, user, verification } from "@/database/schemas/auth";
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH
} from "@/features/auth/lib/constants";
import { appLogger } from "@/lib/logger";

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user,
      account,
      session,
      verification
    }
  }),
  logger: {
    log: (level, message, ...args) => {
      const pinoLevel =
        level === "warn" || level === "error" || level === "debug"
          ? level
          : "info";
      appLogger[pinoLevel]({ metadata: args }, message);
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // this is a prototype template, enable for production apps
    minPasswordLength: MIN_PASSWORD_LENGTH,
    maxPasswordLength: MAX_PASSWORD_LENGTH
  },
  plugins: [nextCookies()] // make sure nextCookies is the last plugin in the array
});

export { auth };
