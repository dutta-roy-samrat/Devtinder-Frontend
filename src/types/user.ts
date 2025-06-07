import { z } from "zod";
import { UserSchema } from "@schema-validations/user-schema";

export enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

export declare type User = z.infer<typeof UserSchema>;
