import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const Groupe = z.object({})

export default resolver.pipe(resolver.zod(Groupe), async ({}, ctx) => {
  const groupe = await db.groupe.create({
    select: {
      id: true,
    },
  })
  return groupe
})
