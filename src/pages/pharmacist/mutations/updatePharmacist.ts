import { resolver, Ctx } from "@blitzjs/rpc"
import db, { prisma } from "db"
import * as z from "zod"

const UpdatePharmacist = z.object({
  userId: z.number(),
  pharmacy: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  rpps: z
    .string()
    .min(11)
    .max(11)
    .transform((str) => str.trim()),
})
export default resolver.pipe(
  resolver.zod(UpdatePharmacist),
  async ({ userId, pharmacy }, { session }: Ctx) => {
    const updatePharmacist = await db.pharmacien.update({
      where: { userId: session.userId },
      data: { pharmacy },
    })

    return updatePharmacist
  }
)
