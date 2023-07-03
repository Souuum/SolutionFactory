import { List, ListItem, Card, Typography } from "@material-tailwind/react"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import updatePatient from "src/pages/patient/mutations/updateUser"
import React, { useState } from "react"
import { loadBlitzRpcResolverFilesWithInternalMechanism, useMutation, useQuery } from "@blitzjs/rpc"
import PrintIcon from "@mui/icons-material/Print"
import DownloadIcon from "@mui/icons-material/Download"
import OrdonnanceDetails from "./OrdonnanceDetails"
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
  const [openOrdonnanceId, setOpenOrdonnanceId] = useState(null)

  const handleOrdonnanceClick = (ordonnanceId) => {
    setOpenOrdonnanceId((prevId) => (prevId === ordonnanceId ? null : ordonnanceId))
    console.log("ordonnanceid")
    console.log(openOrdonnanceId)
  }

  return (
    <>
      {data.ordonnances.map((ordonnance) => (
        <div
          key={ordonnance.id}
          onClick={() => handleOrdonnanceClick(ordonnance)}
          className="flex flex-wrap mt-10 justify-center w-[1000px] bg-white font-bold rounded shadow-md py-2 px-6 items-center"
        >
          <div className="m-3 w-[75px] flex-none">
            <a>x</a>
          </div>
          <div className="flex-none text-[#188CA5] w-[250px]">
            <a>{formatDateToDDMMYYYY(ordonnance.createdAt)}</a>
          </div>
          <div className="flex-none text-[#188CA5] w-[200px]">
            <a>{ordonnance.medecin.user.lastName}</a>
          </div>
          <div className="flex-none mr-6 text-[#979797] w-[200px]">
            <a>ordonnance.pdf</a>
          </div>
          <div className="flex-none w-[75px]">
            <PrintIcon className="text-[#188CA5] mr-4 w-15 h-15" />
          </div>
          <div className="flex-none w-[75px]">
            <DownloadIcon className="text-[#188CA5] mr-4 w-15 h-15" />
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
    </>
  )
}
