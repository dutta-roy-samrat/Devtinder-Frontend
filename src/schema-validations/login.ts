import { RegisterUserSchema } from "@schema-validations/register-user";

const LoginSchema = RegisterUserSchema.pick({
    email: true,
    password: true,
});

export { LoginSchema };