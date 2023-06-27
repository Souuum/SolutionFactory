import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetDrugsInput
  extends Pick<Prisma.PatientFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetDrugsInput) => {
    const {
      items: drugs,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.drug.count({ where: {} }),
      query: (paginateArgs) => db.drug.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      drugs,
      nextPage,
      hasMore,
      count,
    }
  }
)
