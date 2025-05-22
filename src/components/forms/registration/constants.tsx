import { Gender } from "types/user";

export const DEFAULT_FORM_VALUES = {
  firstName: "",
  lastName: "",
  gender: undefined as Gender | undefined,
  dateOfBirth: undefined as Date | undefined,
  password: "",
  email: "",
};

export const GENDER_OPTIONS = [
  {
    value: "MALE",
    label: "Male",
  },
  {
    value: "FEMALE",
    label: "Female",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];
