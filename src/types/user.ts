export enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

export declare type User = {
  firstName: string;
  lastName: string;
  gender: Gender | string;
  dateOfBirth: Date | string;
  password: string;
  email: string;
  profile?: {
    avatarFile?: string;
    bio?: string;
  };
  skils?: string[];
};
