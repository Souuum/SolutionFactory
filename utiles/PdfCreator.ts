import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import fs from "fs"

export default async function generateInvoicePDF(
  patientName,
  purchaseDate,
  medecin,
  patient,
  prescription
) {
  console.log("buyerName", patientName)
  console.log("purchaseDate", purchaseDate)
  console.log("baseAddress", medecin)
  console.log("facturationAddress", patient)
  console.log("products", prescription)

  // Création d'un nouveau document PDF
  const pdfDoc = await PDFDocument.create()

  // Définition des polices de caractères
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // Fonction pour créer un rectangle avec le texte spécifié
  const drawRectangle = (x, y, width, height, text, page) => {
    page.drawText(text, { x, y: y - height + 15, font, size: 12, color: rgb(0, 0, 0) })
    page.drawRectangle({ x, y, width, height, color: rgb(0.9, 0.9, 0.9) })
  }

  const drawMedecinInfo = (x, y, medecin, page) => {
    console.log("medecinPDF", medecin)
    const lineHeight = 15
    const fields = [
      { label: "Docteur:", value: `${medecin.name}` },
      { label: "Cabinet:", value: `${medecin.cabinet}` },
      { label: "speciality:", value: `${medecin.speciality}` },
    ]

    console.log("fieldsBase", fields)
    let currentY = y
    fields.forEach((field) => {
      page.drawText(field.label, { x, y: currentY, font, size: 12, color: rgb(0, 0, 0) })
      page.drawText(field.value.toString(), {
        x: x + 120,
        y: currentY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      })
      currentY -= lineHeight
    })
  }

  const drawOrdoInfo = (x, y, patient, prescription, page) => {
    console.log("addressFactPDF", patient, prescription)
    const lineHeight = 15
    const fields = [
      { label: "Nom:", value: `${patient.name}` },
      { label: "Date:", value: `${prescription.date}` },
      { label: "Date d'expiration:", value: `${prescription.expirationDate}` },
    ]
    console.log("fieldsFact", fields)
    let currentY = y
    fields.forEach((field) => {
      page.drawText(field.label, { x, y: currentY, font, size: 12, color: rgb(0, 0, 0) })
      page.drawText(field.value.toString(), {
        x: x + 120,
        y: currentY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      })
      currentY -= lineHeight
    })
  }

  const drawProductList = (x, y, products, page) => {
    const lineHeight = 15
    const pageHeight = 700 // Hauteur maximale d'une page
    let currentY = y
    // var totalPriceFinale = 0

    const drawProductRow = (page, prescription) => {
      console.log("product pdf", prescription)
      const fields = [
        { label: "Nom:", value: `${prescription.drugs}` },
        { label: "Date:", value: `${prescription.description}` },
      ]
      page.drawText(prescription.prescription.drugs, {
        x,
        y: currentY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      })
      page.drawText(prescription.description, {
        x: x + 200,
        y: currentY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      })
      // page.drawText(pres.product.price.toString(), {
      // x: x + 300,
      // y: currentY,
      // font,
      // size: 12,
      // color: rgb(0, 0, 0),
      // })
      // page.drawText(totalPrice.toString(), {
      // x: x + 400,
      // y: currentY,
      // font,
      // size: 12,
      // color: rgb(0, 0, 0),
      // })
      currentY -= lineHeight
    }

    products.forEach((prescription) => {
      if (currentY <= lineHeight) {
        // Créer une nouvelle page si la hauteur est atteinte
        page = pdfDoc.addPage()
        currentY = pageHeight - lineHeight
      }
      drawProductRow(page, prescription)
    })
    // console.log("totalPriceFinale", totalPriceFinale)
    // page.drawText("Prix Total (€)", {
    // x: 50,
    // y: currentY - 10,
    // font,
    // size: 12,
    // color: rgb(0, 0, 0),
    // })
    // page.drawText(totalPriceFinale.toString(), {
    // x: 450,
    // y: currentY - 10,
    // font,
    // size: 12,
    // color: rgb(0, 0, 0),
    // })
  }

  // Affichage des informations de l'acheteur
  const page = pdfDoc.addPage()
  const patientInfo = `Ordonnance pour: ${patientName}`
  // const purchaseInfo = `Date de l'achat: ${purchaseDate.toLocaleDateString("fr-FR", {
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "numeric",
  // })}`
  drawRectangle(50, 750, 400, 30, patientInfo, page)
  //drawRectangle(420, 750, 200, 30, purchaseInfo, page)

  // Affichage de l'adresse de base
  page.drawText(`Information Medecin`, { x: 340, y: 700, font, size: 15, color: rgb(0, 0, 0) })
  drawMedecinInfo(340, 670, medecin, page)

  // Affichage de l'adresse de facturation
  page.drawText(`Adresse Patient et ordonnace`, {
    x: 50,
    y: 700,
    font,
    size: 15,
    color: rgb(0, 0, 0),
  })
  drawOrdoInfo(50, 670, patient, prescription, page)

  // Affichage de la liste des produits
  page.drawText(`Produits`, { x: 50, y: 515, font, size: 15, color: rgb(0, 0, 0) })
  page.drawText(`Nom`, { x: 50, y: 490, font, size: 13, color: rgb(0, 0, 0) })
  page.drawText(`description`, { x: 250, y: 490, font, size: 13, color: rgb(0, 0, 0) })
  // page.drawText(`Prix unitaire (€)`, { x: 350, y: 490, font, size: 13, color: rgb(0, 0, 0) })
  //page.drawText(`Prix total (€)`, { x: 450, y: 490, font, size: 13, color: rgb(0, 0, 0) })
  drawProductList(50, 470, prescription, page)

  // Génération du document PDF en bytes
  const pdfBytes = await pdfDoc.save()

  // Nom du fichier PDF à enregistrer
  const fileName = "document.pdf"

  // Enregistrement du fichier PDF sur le disque
  fs.writeFileSync(fileName, pdfBytes)
  console.log(`Le fichier ${fileName} a été généré avec succès.`)
}
