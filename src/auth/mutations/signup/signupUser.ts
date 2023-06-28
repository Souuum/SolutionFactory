import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const Signup = z.object({
  email: z.string().email(),
})
export default resolver.pipe(resolver.zod(Signup), async ({ email }, ctx) => {
  const user = await db.user.create({
    data: { email },
    select: {
      id: true,
    },
  })
  return user
})
