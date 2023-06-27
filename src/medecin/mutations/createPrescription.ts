import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const Prescription = z.object({
  ordonnanceId: z.number(),
  drugId: z.number(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
export default resolver.pipe(
  resolver.zod(Prescription),
  async ({ ordonnanceId, drugId, description, createdAt, updatedAt }, ctx) => {
    const prescription = await db.prescription.create({
      data: {
        ordonnanceId,
        drugId,
        description,
        createdAt,
        updatedAt,
      },
      select: {
        ordonnanceId: true,
        drugId: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return prescription
  }
)
