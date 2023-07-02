import { Ctx } from "blitz"
import db from "db"

export default async function getOrdonnances(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const ordonnances = await db.ordonnance.findMany({
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
    },
  })

  return ordonnances
}
