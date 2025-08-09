import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_BETTER_AUTH_URL: z.url()
  },
  runtimeEnv: {
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env["NEXT_PUBLIC_BETTER_AUTH_URL"]
  }
});

export { clientEnv };
