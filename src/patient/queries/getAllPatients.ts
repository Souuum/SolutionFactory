import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetPatientsInput
  extends Pick<Prisma.PatientFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPatientsInput) => {
    const {
      items: users,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.user.count({ where: { role: "SUPERPATIENT" || "PATIENT" } }),
      query: (paginateArgs) =>
        db.user.findMany({
          ...paginateArgs,
          where: { role: "SUPERPATIENT" || "PATIENT" },
          orderBy,
          include: { patients: true },
        }),
    })

    return {
      users,
      nextPage,
      hasMore,
      count,
    }
  }
)
