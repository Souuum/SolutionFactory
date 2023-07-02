import { Ctx } from "blitz"
import db from "db"

export default async function getActualOrdonnances(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const currentDate = new Date()
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3)

  const groupe = await db.user.findUnique({
    where: {
      id: session.userId,
    },
    include: {
      patients: {
        include: {
          groupe: {
            include: {
              patients: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return groupe
}
