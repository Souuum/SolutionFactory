import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { Role } from "types"

const Medecin = z.object({
  rpps: z
    .string()
    .min(11)
    .max(11)
    .transform((str) => str.trim()),
  cabinet: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  specialty: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  userId: z.number(),
  numRue: z
    .string()
    .min(1)
    .max(3)
    .transform((str) => str.trim()),
  nomRue: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
  codePostal: z
    .string()
    .min(5)
    .max(5)
    .transform((str) => str.trim()),
  ville: z
    .string()
    .min(2)
    .max(100)
    .transform((str) => str.trim()),
})
export default resolver.pipe(
  resolver.zod(Medecin),
  async ({ userId, rpps, cabinet, specialty, numRue, nomRue, codePostal, ville }, ctx) => {
    const medecin = await db.medecin.create({
      data: {
        rpps,
        cabinet,
        specialty,
        userId,
        numRue,
        nomRue,
        codePostal,
        ville,
      },
      select: {
        id: true,
        rpps: true,
        cabinet: true,
        specialty: true,
        numRue: true,
        nomRue: true,
        codePostal: true,
        ville: true,
      },
    })

    return medecin
  }
)
