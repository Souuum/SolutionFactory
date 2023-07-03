import { useQuery } from "@blitzjs/rpc"
import getPdfOrdonnances from "../queries/getPdfOrdonances"

// hook = ordonance id en parametre et on remonte tout

export const usePdfInfos = (ordonnanceId: number) => {
  // creer query avec include et utiliser ici

  const [ordonnanceInfo] = useQuery(getPdfOrdonnances, null)

  const pdfInfos = () => {
    return {
      userfirstName: ordonnanceInfo?.patient.user.firstName,
      userlastName: ordonnanceInfo?.patient.user.lastName,
      medecinspeciality: ordonnanceInfo?.medecin.specialty,
      medecincabinet: ordonnanceInfo?.medecin.cabinet,
      prescriptiondrug: ordonnanceInfo?.prescriptions[0]?.drug,
      prescriptiondescription: ordonnanceInfo?.prescriptions[0]?.description,
      prescriptionexpirationTime: ordonnanceInfo?.prescriptions[0]?.expirationTime,
    }
  }

  return pdfInfos
}
