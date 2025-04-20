import { z } from "zod";

const ProfileSchema = z.object({
  profileUrl: z
    .string()
    .trim()
    .url({ message: "Invalid profile URL" })
    .optional(),
  bio: z
    .string()
    .trim()
    .max(255, { message: "Bio must be less than 255 characters" })
    .optional(),
});

export { ProfileSchema };
