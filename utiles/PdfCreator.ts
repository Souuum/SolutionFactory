import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import fs from "fs"

export default async function generateInvoicePDF(
  buyerName,
  purchaseDate,
  baseAddress,
  facturationAddress,
  products
) {
  console.log("buyerName", buyerName)
  console.log("purchaseDate", purchaseDate)
  console.log("baseAddress", baseAddress)
  console.log("facturationAddress", facturationAddress)
  console.log("products", products)

  // Création d'un nouveau document PDF
  const pdfDoc = await PDFDocument.create()

  // Définition des polices de caractères
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

  // Fonction pour créer un rectangle avec le texte spécifié
  const drawRectangle = (x, y, width, height, text, page) => {
    page.drawText(text, { x, y: y - height + 15, font, size: 12, color: rgb(0, 0, 0) })
    page.drawRectangle({ x, y, width, height, color: rgb(0.9, 0.9, 0.9) })
  }

  const drawBaseAddressInfo = (x, y, address, page) => {
    console.log("addressBasePDF", address)
    const lineHeight = 15
    const fields = [
      { label: "Nom:", value: `${buyerName}` },
      { label: "Numéro:", value: `${address.number.toString()}` },
      { label: "Rue:", value: address.road },
      { label: "Ville:", value: address.city },
      { label: "Département:", value: address.department },
      { label: "Pays:", value: address.country },
      { label: "Code postal:", value: `${address.postcode.toString()}` },
      { label: "Complémentaire:", value: address.complimentary },
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

  const drawFactAddressInfo = (x, y, address, page) => {
    console.log("addressFactPDF", address)
    const lineHeight = 15
    const fields = [
      { label: "Nom:", value: `${address.first_name} ${address.last_name}` },
      { label: "Mail:", value: `${address.email}` },
      { label: "Numéro:", value: `${address.number.toString()}` },
      { label: "Rue:", value: `${address.road}` },
      { label: "Ville:", value: `${address.city}` },
      { label: "Département:", value: `${address.department}` },
      { label: "Pays:", value: `${address.country}` },
      { label: "Code postal:", value: `${address.postcode.toString()}` },
      { label: "Complémentaire:", value: `${address.complimentary}` },
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
    var totalPriceFinale = 0

    const drawProductRow = (page, product) => {
      console.log("product pdf", product)
      const totalPrice = product.quantity * product.product.price
      totalPriceFinale = totalPriceFinale + totalPrice
      page.drawText(product.product.name, { x, y: currentY, font, size: 12, color: rgb(0, 0, 0) })
      page.drawText(product.quantity.toString(), {
        x: x + 200,
        y: currentY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      })
      page.drawText(product.product.price.toString(), {
        x: x + 300,
        y: currentY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      })
      page.drawText(totalPrice.toString(), {
        x: x + 400,
        y: currentY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
      })
      currentY -= lineHeight
    }

    products.forEach((product) => {
      if (currentY <= lineHeight) {
        // Créer une nouvelle page si la hauteur est atteinte
        page = pdfDoc.addPage()
        currentY = pageHeight - lineHeight
      }
      drawProductRow(page, product)
    })
    console.log("totalPriceFinale", totalPriceFinale)
    page.drawText("Prix Total (€)", {
      x: 50,
      y: currentY - 10,
      font,
      size: 12,
      color: rgb(0, 0, 0),
    })
    page.drawText(totalPriceFinale.toString(), {
      x: 450,
      y: currentY - 10,
      font,
      size: 12,
      color: rgb(0, 0, 0),
    })
  }

  // Affichage des informations de l'acheteur
  const page = pdfDoc.addPage()
  const buyerInfo = `Nom de l'acheteur: ${buyerName}`
  const purchaseInfo = `Date de l'achat: ${purchaseDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}`
  drawRectangle(50, 750, 400, 30, buyerInfo, page)
  drawRectangle(420, 750, 200, 30, purchaseInfo, page)

  // Affichage de l'adresse de base
  page.drawText(`Adresse Livraison`, { x: 340, y: 700, font, size: 15, color: rgb(0, 0, 0) })
  drawBaseAddressInfo(340, 670, baseAddress, page)

  // Affichage de l'adresse de facturation
  page.drawText(`Adresse Facturation`, { x: 50, y: 700, font, size: 15, color: rgb(0, 0, 0) })
  drawFactAddressInfo(50, 670, facturationAddress, page)

  // Affichage de la liste des produits
  page.drawText(`Produits`, { x: 50, y: 515, font, size: 15, color: rgb(0, 0, 0) })
  page.drawText(`Nom`, { x: 50, y: 490, font, size: 13, color: rgb(0, 0, 0) })
  page.drawText(`Quantité`, { x: 250, y: 490, font, size: 13, color: rgb(0, 0, 0) })
  page.drawText(`Prix unitaire (€)`, { x: 350, y: 490, font, size: 13, color: rgb(0, 0, 0) })
  page.drawText(`Prix total (€)`, { x: 450, y: 490, font, size: 13, color: rgb(0, 0, 0) })
  drawProductList(50, 470, products, page)

  // Génération du document PDF en bytes
  const pdfBytes = await pdfDoc.save()

  // Nom du fichier PDF à enregistrer
  const fileName = "document.pdf"

  // Enregistrement du fichier PDF sur le disque
  fs.writeFileSync(fileName, pdfBytes)
  console.log(`Le fichier ${fileName} a été généré avec succès.`)
}
