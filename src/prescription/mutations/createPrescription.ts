import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { useMutation } from "@blitzjs/rpc"

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
