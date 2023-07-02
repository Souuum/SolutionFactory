import { generateToken, hash256 } from "@blitzjs/auth"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { createUserMailer } from "mailers/createUserMailer"
import { ForgotPassword } from "../schemas"
import { z } from "zod"

const RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS = 4
const Groupe = z.object({
  email: z.string().email(),
  groupe: z.number(),
})
export default resolver.pipe(resolver.zod(Groupe), async ({ email, groupe }) => {
  // 1. Get the user
  const user = await db.user.findFirst({ where: { email: email.toLowerCase() } })

  // 2. Generate the token and expiration date.
  const token = generateToken()
  const hashedToken = hash256(token)
  const expiresAt = new Date()
  expiresAt.setHours(expiresAt.getHours() + RESET_PASSWORD_TOKEN_EXPIRATION_IN_HOURS)

  // 3. If user with this email was found
  if (user) throw new Error("Email est déjà utilisé")
  else {
    // 4. Delete any existing token with this email
    const findToken = await db.token.findFirst({ where: { sentTo: email } })
    if (findToken) {
      await db.token.deleteMany({ where: { type: "CREATE_USER", sentTo: email } })
    }

    // 5. Save this new token in the database.
    await db.token.create({
      data: {
        type: "RESET_PASSWORD",
        expiresAt,
        hashedToken,
        sentTo: email,
        groupeId: groupe,
      },
    })
    await createUserMailer({ to: email, token }).send()
    // 5. If no user found wait the same time so attackers can't tell the difference
    await new Promise((resolve) => setTimeout(resolve, 750))
  }
  // 6. Return the same result whether a password reset email was sent or not
  return
})
