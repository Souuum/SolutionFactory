import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const Pharmacist = z.object({
  rpps: z
    .string()
    .min(11)
    .max(11)
    .transform((str) => str.trim()),
  userId: z.number(),
  pharmacy: z
    .string()
    .min(3)
    .max(255)
    .transform((str) => str.trim()),
})
export default resolver.pipe(resolver.zod(Pharmacist), async ({ userId, rpps, pharmacy }, ctx) => {
  const pharmacien = await db.pharmacien.create({
    data: {
      rpps,
      userId,
      pharmacy,
    },
    select: {
      id: true,
      rpps: true,
      userId: true,
    },
  })

  return pharmacien
})
