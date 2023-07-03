import { useQuery } from "@blitzjs/rpc"
import getActualOrdonnances from "../queries/getActualOrdonances"

export const useActualOrdonnances = () => {
  const [ordonnances] = useQuery(getActualOrdonnances, null)

  console.log(ordonnances)
  return ordonnances
}
