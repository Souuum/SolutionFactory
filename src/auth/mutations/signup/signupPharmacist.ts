import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const Pharmacist = z.object({
  rpps: z
    .string()
    .min(11)
    .max(11)
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
  birthDate: z.date(),
  email: z
    .string()
    .email()
    .transform((str) => str.toLowerCase().trim()),
  gender: z.enum(["MAN", "WOMAN"]),
  phone: z
    .string()
    .min(10)
    .max(10)
    .transform((str) => str.trim()),
  password: z
    .string()
    .min(10)
    .max(100)
    .transform((str) => str.trim()),
})
export default resolver.pipe(
  resolver.zod(Pharmacist),
  async ({ email, phone, password, lastName, firstName, birthDate, gender, rpps }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const pharmacien = await db.pharmacien.create({
      data: {
        rpps,
        lastName,
        firstName,
        birthDate,
        email,
        gender,
        phone,
        hashedPassword,
      },
      select: {
        id: true,
        rpps: true,
        lastName: true,
        firstName: true,
        birthDate: true,
        email: true,
        gender: true,
        phone: true,
        hashedPassword: false,
      },
    })
    await ctx.session.$create({ userId: pharmacien.id, role: "PHARMACIST" as Role })
    return pharmacien
  }
)
