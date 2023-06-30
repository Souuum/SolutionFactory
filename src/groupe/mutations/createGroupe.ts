import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const Groupe = z.object({
  userId: z.number(),
})

export default resolver.pipe(resolver.zod(Groupe), async ({ userId }, ctx) => {
  const groupe = await db.groupe.create({
    data: {
      name: "Groupe_" + userId,
    },
  })
  console.log(groupe)
  return groupe
})
