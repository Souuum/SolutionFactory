import { resolver } from "@blitzjs/rpc"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import db from "db"
import * as z from "zod"

const Patient = z.object({
  userId: z.number(),
  securityNumber: z
    .string()
    .min(13)
    .max(13)
    .transform((str) => str.trim()),
  phone: z
    .string()
    .min(10)
    .max(10)
    .transform((str) => str.trim()),

  email: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  lastName: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  firstName: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  password: z
    .string()
    .min(10)
    .max(100)
    .transform((str) => str.trim()),
  gender: z.enum(["MAN", "WOMAN"]),
})

export default resolver.pipe(
  resolver.zod(Patient),
  async ({ userId, securityNumber, lastName, firstName, gender, phone, email, password }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const patient = await db.patient.create({
      data: {
        userId,
        securityNumber,
        lastName,
        firstName,
        gender,
        phone,
        email,
        hashedPassword,
      },
      select: {
        id: true,
        securityNumber: true,
        lastName: true,
        firstName: true,
        gender: true,
      },
    })

    return patient
  }
)
