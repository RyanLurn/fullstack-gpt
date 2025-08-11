import * as z from "zod";
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH
} from "@/features/auth/lib/constants";
import { nameSchema } from "@/features/auth/validators/profile";

const emailSchema = z.email("Please enter a real email").trim().normalize();

const passwordSchema = z
  .string()
  .min(
    MIN_PASSWORD_LENGTH,
    `Please enter a password with at least ${MIN_PASSWORD_LENGTH} characters`
  )
  .max(
    MAX_PASSWORD_LENGTH,
    `Please enter a password with at most ${MAX_PASSWORD_LENGTH} characters`
  );

const emailPasswordSignUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema
});

const emailPasswordSignInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z
    .optional(z.literal("on"))
    .transform(value => (value === "on" ? true : false))
});

export { emailPasswordSignUpSchema, emailPasswordSignInSchema };
