import * as z from "zod";
import { nameSchema } from "@/features/auth/validators/profile";

const profileUpdateSchema = z.object({
  name: nameSchema
  // image: imageSchema <- not implemented yet
});

export { profileUpdateSchema };
