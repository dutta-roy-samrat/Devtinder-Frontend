import { z } from "zod";
import { ProfileSchema } from "@schema-validations/profile";
import { SkillSchema } from "@schema-validations/skill";

const UserSchema = z.object({
  id: z.string(),
  age: z.number(),
  gender: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profile: ProfileSchema.omit({
    firstName: true,
    lastName: true,
  }),
  skills: z.array(SkillSchema),
});

export { UserSchema };
