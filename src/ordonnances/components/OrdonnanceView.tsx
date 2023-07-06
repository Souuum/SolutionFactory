import { List, ListItem, Card, Typography } from "@material-tailwind/react"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import updatePatient from "src/pages/patient/mutations/updateUser"
import React, { useState } from "react"
import { loadBlitzRpcResolverFilesWithInternalMechanism, useMutation, useQuery } from "@blitzjs/rpc"
import UploadIcon from "@mui/icons-material/Upload"
import DownloadIcon from "@mui/icons-material/Download"
import CloseIcon from "@mui/icons-material/Close"
import OrdonnanceDetails from "./OrdonnanceDetails"
import createTokenOrdonnance from "src/tokenOrdonnance/mutations/createTokenOrdonnance"
import generateInvoicePDF from "utiles/PdfCreator"
import { set } from "zod"
interface Ordonnance {
  id: number
  patientId: number
  medecinId: number
  category: string
  expiration: Date
  createdAt: Date
  upadtedAt: Date
}

function formatDateToDDMMYYYY(date) {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear().toString()
  return `${day}/${month}/${year}`
}

export default function OrdonnanceView(data: any) {
  console.log(data.ordonnances)
  const [showPopup, setShowPopup] = useState(false)
  const [token, setToken] = useState("")
  const [openOrdonnanceId, setOpenOrdonnanceId] = useState(null)
  const [ordonnanceId, setOrdonnanceId] = useState(null)
  const [createTokenOrdonnanceMutation, { isSuccess }] = useMutation(createTokenOrdonnance)
  const generateToken = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let token = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      token += characters.charAt(randomIndex)
    }
    return token
  }

  const handleOrdonnanceClick = (ordonnanceId) => {
    setOpenOrdonnanceId((prevId) => (prevId === ordonnanceId ? null : ordonnanceId))
    console.log("ordonnanceid")
    console.log(openOrdonnanceId)
  }

  const handleUploadClick = (ordonnance, event) => {
    event.stopPropagation() // Arrêter la propagation de l'événement
    setShowPopup(true)
    setOrdonnanceId(ordonnance.id)
    const token = generateToken(5)
    setToken(token)
    console.log("Clic sur l'icône d'impression :", ordonnance)
  }

  const handleDownloadClick = async (ordonnance, event) => {
    event.stopPropagation()
    // Arrêter la propagation de l'événement
    try {
      console.log(ordonnance)
      console.log("Clic sur l'icône de téléchargement :", ordonnance)
      const pdf = generateInvoicePDF(ordonnance)
    } catch (error) {
      // Gestion des erreurs ici
      console.error(error)
    }
  }

  const handleCloseClick = () => {
    setShowPopup(false)
    setToken("")
  }

  const handleExportClick = async () => {
    try {
      console.log("Exporting token:", token)
      await createTokenOrdonnanceMutation({ token: token, idOrdonnance: ordonnanceId })
      // Logique d'exportation du token ici
    } catch (error) {
      // Gestion des erreurs ici
      console.error(error)
    }
  }

  return (
    <>
      {data.ordonnances.map((ordonnance) => (
        <div
          key={ordonnance.id}
          onClick={() => handleOrdonnanceClick(ordonnance)}
          className="flex flex-wrap mt-5 justify-center w-[1000px] bg-white font-bold rounded shadow-md py-2 px-6 items-center"
        >
          <div className="flex-none text-[#188CA5] w-[250px]">
            <a>{formatDateToDDMMYYYY(ordonnance.createdAt)}</a>
          </div>
          <div className="flex-none text-[#188CA5] w-[200px]">
            <a>{formatDateToDDMMYYYY(ordonnance.expiration)}</a>
          </div>
          <div className="flex-none text-[#188CA5] w-[200px]">
            <a>Dr. {ordonnance.medecin.user.lastName}</a>
          </div>
          <div className="flex-none w-[75px] mx-10">
            <UploadIcon
              onClick={(event) => handleUploadClick(ordonnance, event)}
              className="text-[#188CA5] mr-4 w-15 h-15"
            />
          </div>
          <div className="flex-none w-[75px]">
            <DownloadIcon
              onClick={(event) => handleDownloadClick(ordonnance, event)}
              className="text-[#188CA5] mr-4 w-15 h-15"
            />
          </div>
          {openOrdonnanceId === ordonnance && (
            <OrdonnanceDetails
              ordonnance={ordonnance}
              onClose={() => handleOrdonnanceClick(ordonnance.id)}
              style={{ position: "absolute", top: 0, left: 0 }} // Adjust the style as needed
            />
          )}
        </div>
      ))}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-64 rounded p-4 relative">
            <button className="text-gray-500 absolute top-2 right-2" onClick={handleCloseClick}>
              <CloseIcon className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold mb-4">Le code de votre ordonnance:</h3>
            <p className="text-3xl font-bold mb-4">{token}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleExportClick}
            >
              Valider
            </button>
          </div>
        </div>
      )}
    </>
  )
}
