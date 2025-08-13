import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

const serverEnv = createEnv({
  server: {
    DB_FILE_NAME: z.string().min(1),
    GROQ_API_KEY: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    LOG_LEVEL: z
      .enum(["trace", "debug", "info", "warn", "error", "fatal", "silent"])
      .optional()
  },
  experimental__runtimeEnv: process.env
});

export { serverEnv };
