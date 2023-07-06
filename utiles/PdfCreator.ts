import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

export default async function generateInvoicePDF(ordonnance) {
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
    console.log(fields)
    fields.forEach(({ label, value }) => {
      console.log(value)
      console.log(typeof value)
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
    console.log(products)
    products.forEach(({ drug, description, morning, afternoon, evening }) => {
      drawText(page, drug.toString(), x, currentY, rgb(0, 0, 0), 14)
      currentY -= lineHeight
      currentY -= lineHeight

      drawText(page, description, x, currentY, rgb(0, 0, 0), 14)
      currentY -= lineHeight
      currentY -= lineHeight

      drawText(
        page,
        `Matin: ${morning === 0 ? "Non" : morning.toString()}`,
        x,
        currentY,
        rgb(0, 0, 0),
        12
      )
      currentY -= lineHeight

      drawText(
        page,
        `Après-midi: ${afternoon === 0 ? "Non" : afternoon.toString()}`,
        x,
        currentY,
        rgb(0, 0, 0),
        12
      )
      currentY -= lineHeight

      drawText(
        page,
        `Soir: ${evening === 0 ? "Non" : evening.toString()}`,
        x,
        currentY,
        rgb(0, 0, 0),
        12
      )
      currentY -= lineHeight

      currentY -= lineHeight
      currentY -= lineHeight
    })
  }

  const page = pdfDoc.addPage()

  // Affichage du nom du patient
  drawText(page, ordonnance.patient.user.lastName, 50, 750, rgb(0, 0, 0), 16)

  // Affichage de la date de prescription
  drawText(page, `Date: ${ordonnance.createdAt.toLocaleDateString("fr-FR")}`, 50, 720)

  // Affichage des informations du médecin
  drawSection(
    page,
    "Médecin",
    [
      { label: "Docteur:", value: ordonnance.medecin.user.lastName },
      { label: "Cabinet:", value: ordonnance.medecin.cabinet },
      { label: "Spécialité:", value: ordonnance.medecin.specialty },
    ],
    50,
    680
  )

  // Affichage des informations du patient
  drawSection(
    page,
    "Patient",
    [
      { label: "Nom:", value: ordonnance.patient.user.lastName },
      { label: "Date de naissance:", value: ordonnance.patient.user.birthDate },
      { label: "Sécurité sociale:", value: ordonnance.patient.securityNumber },
    ],
    50,
    600
  )

  // Affichage de la liste des prescriptions
  drawProductList(page, ordonnance.prescriptions, 50, 450)

  const pdfBytes = await pdfDoc.save()
  const fileName = "ordonnance.pdf"
  const downloadLink = document.createElement("a")
  downloadLink.href = URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }))
  downloadLink.download = fileName

  console.log(`Le fichier ${fileName} a été généré avec succès.`)

  downloadLink.click()
}
