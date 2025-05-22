"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Label, LabelInputContainer } from "@components/ui/label";
import { Input } from "@components/ui/input";
import StyledLink from "@components/ui/styled-link";
import ErrorMsg from "@components/ui/error-msg";

import { loginApi } from "@apis/auth";

import { LoginSchema } from "@schema-validations/login";

import { DEFAULT_FORM_VALUES } from "@components/forms/login/constants";
import { FEED, HOME, REGISTER } from "@constants/routes";

import styles from "./main.module.css";
import { Button } from "@components/ui/button";

const defaultObj = {};

const LoginForm = () => {
  const router = useRouter();
  const { mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: ({ message }) => {
      toast.success(message);
      router.push(FEED.url);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const { register, handleSubmit, formState } = useForm<
    z.input<typeof LoginSchema>
  >({
    resolver: zodResolver(LoginSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const { errors, isSubmitting } = formState;

  const { email: emailError, password: passwordError } = errors || defaultObj;

  const onSubmit: SubmitHandler<z.input<typeof LoginSchema>> = (
    data,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
    login(data);
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
        <LabelInputContainer className={styles.inputContainerClass}>
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
        <LabelInputContainer className={styles.inputContainerClass}>
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
        <Button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Login &rarr;
        </Button>
        <div className={styles.divider} />
        <StyledLink
          href="/reset-password"
          className="mt-5 flex items-center justify-center text-sm font-semibold hover:underline"
        >
          Forgot Your Password?
        </StyledLink>
      </form>
    </div>
  );
};

export default LoginForm;
