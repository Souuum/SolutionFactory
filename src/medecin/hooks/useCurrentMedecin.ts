import { useQuery } from "@blitzjs/rpc"
import getCurrentMedecin from "../queries/getCurrentMedecin"

export const useCurrentMedecin = () => {
  const [medecin] = useQuery(getCurrentMedecin, null)
  return medecin
}
