import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const Ordonnance = z.object({
  patientId: z.number().positive(),
  createdBy: z.number().positive(),
})
export default resolver.pipe(resolver.zod(Ordonnance), async ({ patientId, createdBy }, ctx) => {
  const ordonnance = await db.ordonnance.create({
    data: {
      patientId,
      createdBy,
    },
    select: {
      id: true,
      patientId: true,
      createdBy: true,
    },
  })

  return ordonnance
})
