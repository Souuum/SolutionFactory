import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const Medecin = z.object({
  userId: z.number(),
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
})
export default resolver.pipe(
  resolver.zod(Medecin),
  async ({ userId, rpps, cabinet, specialty }, ctx) => {
    const medecin = await db.medecin.create({
      data: {
        userId,
        rpps,
        cabinet,
        specialty,
      },
      select: {
        id: true,
        rpps: true,
        cabinet: true,
        specialty: true,
      },
    })

    return medecin
  }
)
