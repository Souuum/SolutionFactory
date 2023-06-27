import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const Ordonnance = z.object({
  patientId: z.number(),
  createdBy: z.number(),
})
export default resolver.pipe(resolver.zod(Ordonnance), async ({ patientId, createdBy }, ctx) => {
  const ordonnance = await db.ordonnance.create({
    data: {
      patientId,
      createdBy,
    },
    select: {
      patientId: true,
      createdBy: true,
    },
  })

  return Ordonnance
})
