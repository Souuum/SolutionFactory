import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    include: { patients: true, medecin: true, pharmacien: true },
  })

  console.log(user)
  return user
}
