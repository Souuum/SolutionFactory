import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import * as z from "zod"

const Signup = z.object({
  email: z
    .string()
    .email()
    .transform((str) => str.toLowerCase().trim()),
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
  password: z
    .string()
    .min(10)
    .max(100)
    .transform((str) => str.trim()),
  role: z.enum(["PHARMACIST", "MEDECIN", "PATIENT"]),
  lastname: z
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
  gender: z.enum(["MAN", "WOMAN"]),
})
export default resolver.pipe(
  resolver.zod(Signup),
  async (
    { email, securityNumber, phone, password, role, lastname, firstName, birthDate, gender },
    ctx
  ) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        email,
        hashedPassword,
        securityNumber,
        role,
        lastname,
        firstName,
        birthDate,
        gender,
        phone,
      },
      select: {
        id: true,
        email: true,
        hashedPassword: true,
        securityNumber: true,
        role: true,
        lastname: true,
        firstName: true,
        birthDate: true,
        gender: true,
        phone: true,
      },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
