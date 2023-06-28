import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const Patient = z.object({
  securityNumber: z
    .string()
    .min(13)
    .max(13)
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
  role: z.enum(["SUPERUSER", "USER"]),
  userId: z.number(),
  groupeId: z.number(),
})

export default resolver.pipe(
  resolver.zod(Patient),
  async ({ userId, securityNumber, groupeId }, ctx) => {
    const patient = await db.patient.create({
      data: {
        securityNumber,
        userId,
        groupeId,
      },
      select: {
        id: true,
        securityNumber: true,
        userId: true,
        groupeId: true,
      },
    })
    await ctx.session.$create({ userId: patient.id, role: patient.role as Role })
    return patient
  }
)
