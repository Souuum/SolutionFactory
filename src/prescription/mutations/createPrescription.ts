import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { useMutation } from "@blitzjs/rpc"
const Prescription = z.object({
  ordonnanceId: z.number(),
  drug: z.string().trim(),
  description: z.string().trim(),
  morning: z.number().nonnegative(),
  afternoon: z.number().nonnegative(),
  evening: z.number().nonnegative(),
  expirationTime: z.date(),
})
export default resolver.pipe(
  resolver.zod(Prescription),
  async ({ ordonnanceId, drug, description, morning, afternoon, evening, expirationTime }, ctx) => {
    const prescription = await db.prescription.create({
      data: {
        ordonnanceId,
        drug,
        description,
        morning,
        afternoon,
        evening,
        expirationTime,
      },
      select: {
        id: true,
        ordonnanceId: true,
        drug: true,
        description: true,
        morning: true,
        afternoon: true,
        evening: true,
        expirationTime: true,
      },
    })

    return prescription
  }
)
