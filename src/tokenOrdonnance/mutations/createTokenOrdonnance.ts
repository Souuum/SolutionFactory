import { generateToken, hash256 } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { forgotPasswordMailer } from "mailers/forgotPasswordMailer"
import { z } from "zod"

const RESET_PASSWORD_TOKEN_EXPIRATION_IN_MIN = 3600
const ForgotPassword = z.object({
  token: z
    .string()
    .min(5)
    .max(5)
    .transform((str) => str.trim()),
  idOrdonnance: z.number(),
})

export default resolver.pipe(resolver.zod(ForgotPassword), async ({ token, idOrdonnance }) => {
  // 1. Get the user
  const ordonnance = await db.tokenOrdonnance.findFirst({ where: { ordonnanceId: idOrdonnance } })

  // 2. Generate the token and expiration date.

  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + RESET_PASSWORD_TOKEN_EXPIRATION_IN_MIN)

  // 3. If user with this email was found
  if (ordonnance) {
    // 4. Delete any existing password reset tokens
    await db.tokenOrdonnance.deleteMany({
      where: { type: "EXPORT_ORDONNANCE", ordonnanceId: idOrdonnance },
    })
    // 5. Save this new token in the database.
    const tokenCreated = await db.tokenOrdonnance.create({
      data: {
        ordonnanceId: idOrdonnance,
        type: "EXPORT_ORDONNANCE",
        expiresAt,
        token,
        sentTo: "PHARMACIST|PATIENT",
      },
    })
  } else {
    const tokenCreated = await db.tokenOrdonnance.create({
      data: {
        ordonnanceId: idOrdonnance,
        type: "EXPORT_ORDONNANCE",
        expiresAt,
        token,
        sentTo: "PHARMACIST|PATIENT",
      },
    })
  }
  // 6. Return the same result whether a password reset email was sent or not
  return
})
