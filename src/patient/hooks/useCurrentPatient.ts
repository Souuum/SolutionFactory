import { useQuery } from "@blitzjs/rpc"
import getCurrentPatient from "../queries/getCurrentPatients"

export const useCurrentPatient = (patientId: number) => {
  const [patient] = useQuery(getCurrentPatient, { id: patientId })

  console.log(patient)
  return patient
}
