import * as z from "zod";

const nameSchema = z
  .string()
  .min(1, "Please enter your name")
  .max(747, "Seriously, your name breaks the world record?")
  .trim()
  .normalize();

export { nameSchema };
