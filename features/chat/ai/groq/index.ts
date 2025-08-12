import { createGroq } from "@ai-sdk/groq";
import { serverEnv } from "@/lib/env/server";

const groq = createGroq({
  apiKey: serverEnv.GROQ_API_KEY
});

export { groq };
