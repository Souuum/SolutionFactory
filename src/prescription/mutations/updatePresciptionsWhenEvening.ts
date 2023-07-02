import { resolver } from "@blitzjs/rpc"
import db, { prisma } from "db"
import * as z from "zod"

export default resolver.pipe(async () => {
  const updatePrescriptions = await db.prescription.updateMany({
    data: {
      hasTakenAfternoon: false,
      hasTakenMorning: false,
    },
  })

  return updatePrescriptions
})
