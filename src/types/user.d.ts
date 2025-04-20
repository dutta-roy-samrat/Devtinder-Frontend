enum Gender {
  MALE,
  FEMALE,
  OTHER,
}

type User = {
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: Date;
  password: string;
  email: string;
  profile?: {
    avatarFile?: string;
    bio?: string;
  };
  skils?: string[];
};
