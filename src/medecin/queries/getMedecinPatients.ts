import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetPatientsInput
  extends Pick<Prisma.PatientFindManyArgs, "where" | "orderBy" | "skip" | "take"> {
  medecinId: number
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ medecinId, where, orderBy, skip = 0, take = 100 }: GetPatientsInput) => {
    console.log(medecinId)
    const {
      items: patients,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () =>
        db.patient.count({
          where: {
            ordonnance: {
              some: {
                createdBy: medecinId,
              },
            },
          },
        }),
      query: (paginateArgs) =>
        db.patient.findMany({
          ...paginateArgs,
          where: {
            ordonnance: {
              some: {
                createdBy: medecinId,
              },
            },
          },
          orderBy,
          include: { user: true },
        }),
    })

    return {
      patients,
      nextPage,
      hasMore,
      count,
    }
  }
)
