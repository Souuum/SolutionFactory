import { Ctx } from "blitz"
import db from "db"

export default async function getPdfOrdonnances(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const currentDate = new Date()
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3)

  const ordonnances = await db.ordonnance.findFirst({
    where: {
      patient: {
        user: {
          id: session.userId,
        },
      },
    },
    include: {
      medecin: {
        include: {
          user: true,
        },
      },
      patient: {
        include: {
          user: true,
        },
      },
      prescriptions: {},
    },
  })

  return ordonnances
}
