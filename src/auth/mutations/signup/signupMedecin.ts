import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const Medecin = z.object({
  rpps: z
    .string()
    .min(11)
    .max(11)
    .transform((str) => str.trim()),
  cabinet: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  specialty: z
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
  resolver.zod(Medecin),
  async (
    { email, phone, password, lastName, firstName, birthDate, gender, rpps, cabinet, specialty },
    ctx
  ) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const medecin = await db.medecin.create({
      data: {
        rpps,
        cabinet,
        specialty,
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
        cabinet: true,
        specialty: true,
      },
    })
    await ctx.session.$create({ userId: medecin.id, role: "MEDECIN" as Role })
    return medecin
  }
)
