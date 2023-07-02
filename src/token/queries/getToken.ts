import { hash256 } from "@blitzjs/auth"
import { Ctx } from "blitz"
import db from "db"

export default async function getToken(tokenId: string, { session }: Ctx) {
  const hashedToken = hash256(tokenId)
  const token = await db.token.findFirst({
    where: { hashedToken: hashedToken },
  })

  return token
}
