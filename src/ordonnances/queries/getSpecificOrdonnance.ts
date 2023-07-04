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
      token: true,
      patient: {
        include: {
          user: true,
        },
      },
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
  const currentDateTime = new Date()
  const tokenExpirationDateTime = ordonnance.token?.expiresAt
  if (!tokenExpirationDateTime || currentDateTime >= tokenExpirationDateTime) {
    throw new Error("Token has expired")
  }

  return ordonnance
}
