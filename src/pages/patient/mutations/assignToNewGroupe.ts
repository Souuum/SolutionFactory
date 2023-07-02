import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import createGroupe from "src/groupe/mutations/createGroupe"
import { useMutation } from "@blitzjs/rpc"

const PatientAndUser = z.object({
  userId: z.number(),
  patientId: z.number(),
})

export default resolver.pipe(resolver.zod(PatientAndUser), async ({ patientId, userId }, ctx) => {
  try {
    const groupe = await db.groupe.create({
      data: {
        name: "Groupe_" + userId,
      },
    })
    if (groupe) {
      try {
        const user = await db.user.update({
          where: { id: userId },
          data: {
            role: "SUPERPATIENT",
          },
        })
        const patient = await db.patient.update({
          where: { id: patientId },
          data: {
            groupeId: groupe.id,
          },
        })
        return patient
      } catch (error: any) {
        console.log(error)
        return error
      }
    }
  } catch (error: any) {
    console.log(error)
    return error
  }
})
