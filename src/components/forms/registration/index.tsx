"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Label, LabelInputContainer } from "@components/ui/label";
import { Input, InputWrapper } from "@components/ui/input";
import StyledLink from "@components/ui/styled-link";
import DatePicker from "@components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import ErrorMsg from "@components/ui/error-msg";

import { RegisterUserSchema } from "@schema-validations/register-user";

import {
  DEFAULT_FORM_VALUES,
  GENDER_OPTIONS,
} from "@components/forms/registration/constants";
import { FEED, HOME, LOGIN } from "@constants/routes";

import styles from "./main.module.css";
import { useMutation } from "@tanstack/react-query";
import { registerUserApi } from "@apis/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const defaultObj = {};

const RegistrationForm = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<
    z.input<typeof RegisterUserSchema>
  >({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const { mutate: registerUser } = useMutation({
    mutationFn: registerUserApi,
    onSuccess: ({ message }) => {
      toast.success(message);
      router.push(FEED.url);
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const { errors } = formState;

  const {
    firstName: firstNameError,
    lastName: lastNameError,
    email: emailError,
    password: passwordError,
    dateOfBirth: dateOfBirthError,
    gender: genderError,
  } = errors || defaultObj;

  const onSubmit: SubmitHandler<z.input<typeof RegisterUserSchema>> = (
    data,
    e?: React.BaseSyntheticEvent,
  ) => {
    e?.preventDefault();
    registerUser(data as z.output<typeof RegisterUserSchema>);
  };
  const {
    onChange: onGenderChange,
    ref: genderRef,
    onBlur: onGenderBlur,
    name: genderFieldName,
  } = register("gender");

  const renderGenderOptions = () =>
    GENDER_OPTIONS.map((option) => (
      <SelectItem key={option.value} value={option.value} ref={genderRef}>
        {option.label}
      </SelectItem>
    ));

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formHeader}>
        Welcome to{" "}
        <StyledLink href={HOME} className={styles.logoLink}>
          Devtinder
        </StyledLink>
      </h2>
      <p className={styles.existingUserConfirmation}>
        Already have an account?{" "}
        <StyledLink href={LOGIN.url} className={styles.loginLink}>
          Login
        </StyledLink>
      </p>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        id="registration-form"
      >
        <div className={styles.nameInputContainer}>
          <LabelInputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input
              placeholder="John"
              type="text"
              {...register("firstName")}
              error={firstNameError}
            />
            <ErrorMsg error={firstNameError} />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              placeholder="Doe"
              type="text"
              {...register("lastName")}
              error={lastNameError}
            />
            <ErrorMsg error={lastNameError} />
          </LabelInputContainer>
        </div>
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
        <LabelInputContainer className={styles.dateOfBirthInputContainer}>
          <Label htmlFor="dateOfBirth">Date Of Birth</Label>
          <InputWrapper className={dateOfBirthError ? styles.errorInput : ""}>
            <DatePicker
              className={styles.inputClass}
              {...register("dateOfBirth")}
            />
          </InputWrapper>
          <ErrorMsg error={dateOfBirthError} />
        </LabelInputContainer>
        <LabelInputContainer className={styles.genderInputContainer}>
          <Label htmlFor="gender">Gender</Label>
          <InputWrapper className={genderError ? styles.errorInput : ""}>
            <Select
              onChange={(value) =>
                onGenderChange({
                  target: {
                    value,
                    name: genderFieldName,
                  },
                })
              }
              name={genderFieldName}
            >
              <SelectTrigger
                className={styles.inputClass}
                onBlur={onGenderBlur}
              >
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent ref={genderRef}>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  {renderGenderOptions()}
                </SelectGroup>
              </SelectContent>
            </Select>
          </InputWrapper>
          <ErrorMsg error={genderError} />
        </LabelInputContainer>
        <button className={styles.submitButton} type="submit">
          Register &rarr;
        </button>
        <div className={styles.divider} />
      </form>
    </div>
  );
};

export default RegistrationForm;
