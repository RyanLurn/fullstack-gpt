import pino, { type LoggerOptions } from "pino";
import { serverEnv } from "@/lib/env/server";

// Access NODE_ENV directly from process.env, as it's set by the framework.
const isDevelopment = process.env.NODE_ENV === "development";

// Start with the base options that are always present.
const options: LoggerOptions = {
  level: serverEnv.LOG_LEVEL || (isDevelopment ? "trace" : "info"),
  base: {
    // app: "fullstack-gpt"
  }
};

// Conditionally add the transport property only in development.
if (isDevelopment) {
  options.transport = {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname"
    }
  };
}

// In production, the `transport` property will be absent,
// causing pino to fall back to its default behavior.

const logger = pino(options);

export { logger };
