import { Ctx } from "blitz"
import db from "db"

export default async function getActualPrescriptionsByOrdonnances(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const prescriptions = await db.ordonnance.findMany({
    where: {
      patient: {
        user: {
          id: session.userId,
        },
      },
    },
    include: { prescriptions: true },
  })

  return prescriptions
}
