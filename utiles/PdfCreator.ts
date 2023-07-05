import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import fs from "fs"

export default async function generateInvoicePDF(
  patientName,
  purchaseDate,
  medecin,
  patient,
  prescription
) {
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const drawText = (page, text, x, y, color = rgb(0, 0, 0), size = 12) => {
    page.drawText(text, { x, y, font, size, color })
  }

  const drawSection = (page, title, fields, x, y) => {
    const lineHeight = 15
    let currentY = y
    drawText(page, title, x, currentY, rgb(0, 0, 0), 15)
    currentY -= lineHeight
    fields.forEach(({ label, value }) => {
      drawText(page, label, x, currentY)
      drawText(page, value.toString(), x + 120, currentY)
      currentY -= lineHeight
    })
  }

  const drawProductList = (page, products, x, y) => {
    const lineHeight = 15
    const pageWidth = page.getWidth()
    let currentY = y

    drawText(page, "Prescription", 50, currentY, rgb(0, 0.5, 0.9), 18)
    currentY -= 40

    products.forEach(({ drugs, description, morning, afternoon, evening }) => {
      drawText(page, drugs.toString(), x, currentY, rgb(0, 0, 0), 14)
      currentY -= lineHeight
      currentY -= lineHeight

      drawText(page, description, x, currentY, rgb(0, 0, 0), 14)
      currentY -= lineHeight
      currentY -= lineHeight

      drawText(page, `Matin: ${morning === 0 ? "Oui" : "Non"}`, x, currentY, rgb(0, 0, 0), 12)
      currentY -= lineHeight

      drawText(
        page,
        `Après-midi: ${afternoon === 0 ? "Oui" : "Non"}`,
        x,
        currentY,
        rgb(0, 0, 0),
        12
      )
      currentY -= lineHeight

      drawText(page, `Soir: ${evening === 0 ? "Oui" : "Non"}`, x, currentY, rgb(0, 0, 0), 12)
      currentY -= lineHeight

      currentY -= lineHeight
      currentY -= lineHeight
    })
  }

  const page = pdfDoc.addPage()

  // Affichage du nom du patient
  drawText(page, patientName, 50, 750, rgb(0, 0, 0), 16)

  // Affichage de la date de prescription
  drawText(page, `Date: ${purchaseDate.toLocaleDateString("fr-FR")}`, 50, 720)

  // Affichage des informations du médecin
  drawSection(
    page,
    "Médecin",
    [
      { label: "Docteur:", value: medecin.name },
      { label: "Cabinet:", value: medecin.cabinet },
      { label: "Spécialité:", value: medecin.speciality },
    ],
    50,
    680
  )

  // Affichage des informations du patient
  drawSection(
    page,
    "Patient",
    [
      { label: "Nom:", value: patient.name },
      { label: "Date de naissance:", value: patient.birthDate },
      { label: "Sécurité sociale:", value: patient.securityNumber },
    ],
    50,
    600
  )

  // Affichage de la liste des prescriptions
  drawProductList(page, prescription, 50, 450)

  const pdfBytes = await pdfDoc.save()
  const fileName = "ordonnance.pdf"
  fs.writeFileSync(fileName, pdfBytes)
  console.log(`Le fichier ${fileName} a été généré avec succès.`)
}
