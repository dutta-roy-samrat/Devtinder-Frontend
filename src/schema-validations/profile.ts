import { z } from "zod";

const ProfileSchema = z.object({
  firstName: z.string().trim().optional().refine(
    (val) => !val,
    { message: "First name is required  " }
  ),
  lastName: z.string().trim().optional().refine(
    (val) => !val,
    { message: "Last name is required" }
  ),
  profileImageCropInfo: z
    .object({
      x: z.number(),
      y: z.number(),
      width: z.number(),
      height: z.number(),
    })
    .optional(),
  profileImageFile: z.instanceof(File).nullable().optional(),
  bio: z
    .string()
    .trim()
    .max(255, { message: "Bio must be less than 255 characters" })
    .optional(),
});

export { ProfileSchema };
