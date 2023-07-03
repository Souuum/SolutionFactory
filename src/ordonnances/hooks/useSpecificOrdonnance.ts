import { useQuery } from "@blitzjs/rpc"
import getSpecificOrdonnance from "../queries/getSpecificOrdonnance"

export const useSpecificOrdonnance = (token: string) => {
  const [ordonnance] = useQuery(getSpecificOrdonnance, token)

  console.log(ordonnance)
  return ordonnance
}
