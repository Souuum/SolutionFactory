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
      <table className="w-full mt-10 bg-white rounded shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-4 px-6 font-bold">Médicament</th>
            <th className="py-4 px-6 font-bold">Description</th>
            <th className="py-4 px-6 font-bold">Fin de la prescription</th>
            <th className="py-4 px-6 font-bold">Matin</th>
            <th className="py-4 px-6 font-bold">Midi</th>
            <th className="py-4 px-6 font-bold">Soir</th>
          </tr>
        </thead>
        <tbody>
          {data.ordonnance.prescriptions.map((prescription) => (
            <tr key={prescription.id}>
              <td className="py-4 px-6 text-center">{prescription.drug}</td>
              <td className="py-4 px-6 text-center">{prescription.description}</td>
              <td className="py-4 px-6 text-center">
                {formatDateToDDMMYYYY(prescription.expirationTime)}
              </td>
              <td className="py-4 px-6 text-center">{prescription.morning}</td>
              <td className="py-4 px-6 text-center">{prescription.afternoon}</td>
              <td className="py-4 px-6 text-center">{prescription.evening}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
