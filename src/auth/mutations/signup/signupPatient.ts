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
