import { useQuery } from "@blitzjs/rpc"
import getPatientOrdonnances from "../queries/getPatientOrdonnances"

export const usePatientOrdonnances = (patientId: number) => {
  const [ordonnances] = useQuery(getPatientOrdonnances, { id: patientId })

  console.log(ordonnances)
  return ordonnances
}
