import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

const Patient = z.object({
  id: z.number(),
})

export default async function getPatientOrdonnances(input, { session }: Ctx) {
  if (!session.userId) return null

  const currentDate = new Date()
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3)

  const data = Patient.parse(input)
  console.log(data.id)
  const ordonnances = await db.ordonnance.findMany({
    where: {
      patient: {
        id: data.id,
      },
      medecin: {
        user: {
          id: session.userId,
        },
      },
      createdAt: {
        gte: threeMonthsAgo,
        lte: currentDate,
      },
    },
    include: {
      medecin: {
        include: {
          user: true,
        },
      },
      prescriptions: true,
    },
  })

  return ordonnances
}
