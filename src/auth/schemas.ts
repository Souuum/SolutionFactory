import { z } from "zod"

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const securityNumber = z
  .string()
  .min(13)
  .max(13)
  .transform((str) => str.trim())

export const phone = z
  .string()
  .min(10)
  .max(10)
  .transform((str) => str.trim())

export const role = z.enum(["PATIENT", "DOCTOR", "ADMIN", "PHARMACIST"])

export const lastname = z
  .string()
  .min(2)
  .max(100)
  .transform((str) => str.trim())

export const firstName = z
  .string()
  .min(2)
  .max(100)
  .transform((str) => str.trim())

export const gender = z.enum(["HOMME", "FEMME"])

export const birthDate = z.string().transform((str) => str.trim())

export const Signup = z.object({
  email,
  password,
  securityNumber,
  phone,
  role,
  lastname,
  firstName,
  gender,
  birthDate,
})

export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})
