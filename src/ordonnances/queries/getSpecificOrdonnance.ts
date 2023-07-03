import { Ctx } from "blitz"
import db from "db"
import { z } from "zod"

export default async function getSpecificOrdonnance(token: string, { session }: Ctx) {
  if (!session.userId) return null

  console.log("inside query")
  console.log(token.token)

  const ordonnance = await db.ordonnance.findFirst({
    where: {
      token: {
        token: token.token,
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

  if (!ordonnance) {
    throw new Error("Ordonnance not found")
  }

  // Check if the token has expired
  console.log(ordonnance)

  return ordonnance
}
