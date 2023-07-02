import { resolver, Ctx } from "@blitzjs/rpc"
import db, { prisma } from "db"
import * as z from "zod"

const UpdateMedecin = z.object({
  userId: z.number(),
  specialty: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  cabinet: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  rpps: z
    .string()
    .min(11)
    .max(11)
    .transform((str) => str.trim()),
})
export default resolver.pipe(
  resolver.zod(UpdateMedecin),
  async ({ userId, specialty, cabinet }, { session }: Ctx) => {
    const updateMedecin = await db.medecin.update({
      where: { userId: session.userId },
      data: { specialty, cabinet },
    })

    return updateMedecin
  }
)
