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
  numRue: z
    .string()
    .min(1)
    .max(3)
    .transform((str) => str.trim()),
  nomRue: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  codePostal: z
    .string()
    .min(5)
    .max(5)
    .transform((str) => str.trim()),
  ville: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
})
export default resolver.pipe(
  resolver.zod(UpdateMedecin),
  async ({ userId, specialty, cabinet, numRue, nomRue, codePostal, ville }, { session }: Ctx) => {
    const updateMedecin = await db.medecin.update({
      where: { userId: session.userId },
      data: { specialty, cabinet, numRue, nomRue, codePostal, ville },
    })

    return updateMedecin
  }
)
