import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

const serverEnv = createEnv({
  server: {
    DB_FILE_NAME: z.string().min(1)
  },
  experimental__runtimeEnv: process.env
});

export { serverEnv };
