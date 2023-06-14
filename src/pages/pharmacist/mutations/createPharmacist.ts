import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const Medecin = z.object({
  userId: z.number(),
  rpps: z
    .string()
    .min(11)
    .max(11)
    .transform((str) => str.trim()),
})
export default resolver.pipe(resolver.zod(Medecin), async ({ userId, rpps }, ctx) => {
  const pharmacien = await db.pharmacien.create({
    data: {
      userId,
      rpps,
    },
    select: {
      id: true,
      rpps: true,
    },
  })

  return pharmacien
})
