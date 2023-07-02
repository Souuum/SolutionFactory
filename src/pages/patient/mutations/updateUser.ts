import { resolver, Ctx } from "@blitzjs/rpc"
import db, { prisma } from "db"
import * as z from "zod"

const UpdateUser = z.object({
  userId: z.number(),
  phone: z
    .string()
    .min(10)
    .max(10)
    .transform((str) => str.trim()),
  lastName: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  firstName: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  email: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  gender: z.enum(["MAN", "WOMAN"]),
})
export default resolver.pipe(
  resolver.zod(UpdateUser),
  async ({ userId, email, phone }, { session }: Ctx) => {
    const updateUser = await db.user.update({
      where: { id: session.userId },
      data: { email, phone },
    })

    return updateUser
  }
)
