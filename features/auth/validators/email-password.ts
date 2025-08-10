import * as z from "zod";
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH
} from "@/features/auth/lib/constants";

const emailPasswordSignUpSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter your name")
    .max(747, "Seriously, your name breaks the world record?")
    .trim()
    .normalize(),
  email: z.email("Please enter a real email").trim().normalize(),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Please enter a password with at least ${MIN_PASSWORD_LENGTH} characters`
    )
    .max(
      MAX_PASSWORD_LENGTH,
      `Please enter a password with at most ${MAX_PASSWORD_LENGTH} characters`
    )
    .trim()
    .normalize()
});

type EmailPasswordSignUpSchemaType = z.infer<typeof emailPasswordSignUpSchema>;

export { emailPasswordSignUpSchema };
export type { EmailPasswordSignUpSchemaType };
