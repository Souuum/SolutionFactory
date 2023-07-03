import { List, ListItem, Card, Typography } from "@material-tailwind/react"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import updatePatient from "src/pages/patient/mutations/updateUser"
import React, { useState } from "react"
import { loadBlitzRpcResolverFilesWithInternalMechanism, useMutation, useQuery } from "@blitzjs/rpc"
import PrintIcon from "@mui/icons-material/Print"
import DownloadIcon from "@mui/icons-material/Download"

function formatDateToDDMMYYYY(date) {
  const day = date.getDate().toString().padStart(2, "0")
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const year = date.getFullYear().toString()
  return `${day}/${month}/${year}`
}

export default function OrdonnanceDetails(data: any) {
  console.log(data)
  console.log(data.ordonnance.prescriptions)
  return (
    <>
      {data.ordonnance.prescriptions.map((prescription) => (
        <div
          key={prescription.id}
          className="flex flex-wrap mt-10 justify-center w-content bg-white font-bold rounded shadow-md py-2 items-center"
        >
          <div className="m-3 w-[75px] flex-none">
            <a>{prescription.drug}</a>
          </div>
          <div className="m-3 w-[300px] flex-none">
            <a>{prescription.description}</a>
          </div>

          <div className="flex-none text-[#188CA5] w-[250px]">
            <a>{formatDateToDDMMYYYY(prescription.expirationTime)}</a>
          </div>
          <div className="flex-none text-[#188CA5] w-[75px]">
            <a>{prescription.morning}</a>
          </div>
          <div className="flex-none mr-6 text-[#188CA5] w-[75px]">
            <a>{prescription.afternoon}</a>
          </div>
          <div className="flex-none mr-6 text-[#188CA5] w-[75px]">
            <a>{prescription.afternoon}</a>
          </div>
        </div>
      ))}
    </>
  )
}
