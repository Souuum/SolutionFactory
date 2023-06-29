import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

export default resolver.pipe(async ({}, ctx) => {
  const groupe = await db.groupe.create({})
  return groupe
})
