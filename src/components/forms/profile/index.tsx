"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Label, LabelInputContainer } from "@components/ui/label";
import { Input } from "@components/ui/input";
import StyledLink from "@components/ui/styled-link";
import ErrorMsg from "@components/ui/error-msg";

import { LoginSchema } from "@schema-validations/login";

import { DEFAULT_FORM_VALUES } from "@components/forms/registration/constants";
import { HOME, REGISTER } from "@constants/routes";

import styles from "./main.module.css";
import { Avatar } from "@components/ui/avatar";
import { Button } from "@components/ui/button";

const defaultObj = {};

const ProfileView = () => {
  const { register, handleSubmit, formState, getValues } = useForm<
    z.input<typeof LoginSchema>
  >({
    resolver: zodResolver(LoginSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const { errors } = formState;

  const { email: emailError, password: passwordError } = errors || defaultObj;

  const onSubmit: SubmitHandler<z.input<typeof LoginSchema>> = (
    data,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-2xl font-bold text-white">Profile Settings</div>
      <form className="flex flex-col items-center justify-center">
        <div className="m-4 flex flex-col-reverse items-center justify-center md:flex-row md:items-start md:gap-16">
          <div>
            <LabelInputContainer className={styles.emailInputContainer}>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="johndoe@mail.com"
                type="email"
                {...register("email")}
                error={emailError}
              />
              <ErrorMsg error={emailError} />
            </LabelInputContainer>
            <LabelInputContainer className={styles.passwordInputContainer}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                {...register("password")}
                error={passwordError}
              />
              <ErrorMsg error={passwordError} />
            </LabelInputContainer>
          </div>
          <div>
            <Avatar className="h-56 w-56" />
            <div className="m-4 flex flex-col gap-3">
              <Button className="rounded-full">Change</Button>
              <Button className="rounded-full">Remove</Button>
            </div>
          </div>
        </div>
        <Button type="submit" className="w-48 rounded-full">
          Save
        </Button>
      </form>
    </div>
  );
};

export default ProfileView;
