import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentMedecin(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const medecin = await db.medecin.findFirst({
    where: { userId: session.userId },

    select: { id: true, user: true, rpps: true, cabinet: true, specialty: true },
  })

  console.log("medecin")
  console.log(medecin)
  return medecin
}
