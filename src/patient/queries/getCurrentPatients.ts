import { Ctx } from "blitz"
import db from "db"
import * as z from "zod"

const getPatient = z.object({
  id: z.number(),
})

export default async function getCurrentPatient(input, { session }: Ctx) {
  if (!session.userId) return null

  const data = getPatient.parse(input)
  const patient = await db.patient.findFirst({
    where: { id: data.id },
    select: { id: true, firstName: true, lastName: true },
  })

  return patient
}
