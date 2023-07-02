import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const prescription = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(prescription), async ({ id }, ctx) => {
  const prescription = await db.prescription.update({
    where: { id: id },
    data: {
      hasTakenEvening: true,
    },
  })
  return prescription
})
