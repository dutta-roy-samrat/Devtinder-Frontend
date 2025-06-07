import { z } from "zod";
import { ProfileSchema } from "@schema-validations/profile";
import { SkillSchema } from "@schema-validations/skill";

const UserSchema = z.object({
  id: z.string(),
  age: z.number(),
  gender: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profile: z.object({
    croppedProfileImageUrl: z.string(),
    profileImageCropInfo: z.object({
      scale: z.number(),
      crop: z.object({ x: z.number(), y: z.number() }),
    }),
    originalProfileImageUrl: z.string(),
    bio: z.string(),
  }),
  skills: z.array(SkillSchema),
  isLoading: z.boolean(),
});

export { UserSchema };
