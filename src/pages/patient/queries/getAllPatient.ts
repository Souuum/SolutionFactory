import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"

import db, { Prisma } from "db"

interface GetPatientInput
  extends Pick<Prisma.PatientFindManyArgs, "where" | "orderBy" | "skip" | "take" | "include"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPatientInput) => {
    const {
      items: patients,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.patient.count({ where }),
      query: (paginateArgs) => db.patient.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      patient: patients,
      nextPage,
      hasMore,
      count,
    }
  }
)
