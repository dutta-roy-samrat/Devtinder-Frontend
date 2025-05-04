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

const defaultObj = {};

const LoginForm = () => {
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
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>
        Welcome to{" "}
        <StyledLink href={HOME} className={styles.logoLink}>
          Devtinder
        </StyledLink>
      </h2>
      <p className={styles.existingUserConfirmation}>
        Don&apos;t have an account? Register{" "}
        <StyledLink href={REGISTER.url} className={styles.loginLink}>
          here
        </StyledLink>
      </p>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        id="login-form"
      >
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
        <button className={styles.submitButton} type="submit">
          Login &rarr;
        </button>
        <div className={styles.divider} />
        <StyledLink
          href="/reset-password"
          className="flex items-center justify-center text-sm font-semibold hover:underline mt-5"
        >
          Forgot Your Password?
        </StyledLink>
      </form>
    </div>
  );
};

export default LoginForm;
