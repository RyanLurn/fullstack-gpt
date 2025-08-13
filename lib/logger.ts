import pino, { type LoggerOptions } from "pino";
import pretty from "pino-pretty";
import { serverEnv } from "@/lib/env/server";

// Access NODE_ENV directly from process.env, as it's set by the framework.
const isDevelopment = process.env.NODE_ENV === "development";

// The base options that are always present.
const options: LoggerOptions = {
  level: serverEnv.LOG_LEVEL || (isDevelopment ? "trace" : "info"),
  base: {
    // app: "fullstack-gpt"
  }
};

// When in development, create a pino-pretty stream.
// Otherwise, the destination is undefined, and pino will use the default (stdout).
const stream = isDevelopment
  ? pretty({
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname"
    })
  : undefined;

const appLogger = pino(options, stream);

export { appLogger };
