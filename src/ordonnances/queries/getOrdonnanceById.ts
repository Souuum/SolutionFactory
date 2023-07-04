import { Ctx } from "blitz"
import db from "db"

export default async function getActualOrdonnances(id: number, { session }: Ctx) {
  if (!session.userId) return null

  const currentDate = new Date()
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3)

  const ordonnances = await db.ordonnance.findUnique({
    where: {
      id,
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
