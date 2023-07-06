import { useQuery } from "@blitzjs/rpc"
import getPdfOrdonnances from "../queries/getPdfOrdonances"
import generateInvoicePDF from "utiles/PdfCreator"

// hook = ordonance id en parametre et on remonte tout

export const usePdfInfos = (ordonnanceId: number) => {
  // creer query avec include et utiliser ici

  const [ordonnanceInfo] = useQuery(getPdfOrdonnances, null)

  const handlePdfGeneration = async () => {
    await generateInvoicePDF(
      ordonnanceInfo?.patient.user.firstName,
      new Date(),
      ordonnanceInfo?.medecin,
      ordonnanceInfo?.patient,
      ordonnanceInfo?.prescriptions[0]
    )
  }

  return handlePdfGeneration
}
