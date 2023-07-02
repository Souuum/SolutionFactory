import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const Ordonnance = z.object({
  patientId: z.number().positive(),
  createdBy: z.number().positive(),
  category: z.string(),
  expiration: z.date(),
})
export default resolver.pipe(
  resolver.zod(Ordonnance),
  async ({ patientId, createdBy, category, expiration }, ctx) => {
    const ordonnance = await db.ordonnance.create({
      data: {
        patientId,
        createdBy,
        category,
        expiration,
      },
      select: {
        id: true,
        patientId: true,
        createdBy: true,
        category: true,
        expiration: true,
      },
    })

    return ordonnance
  }
)
