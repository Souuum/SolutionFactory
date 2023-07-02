import { List, ListItem, Card, Typography } from "@material-tailwind/react"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import updatePatient from "src/pages/patient/mutations/updateUser"
import React, { Suspense, useState } from "react"
import { loadBlitzRpcResolverFilesWithInternalMechanism, useMutation, useQuery } from "@blitzjs/rpc"
import PrintIcon from "@mui/icons-material/Print"
import DownloadIcon from "@mui/icons-material/Download"
import getOrdonnances from "src/ordonnances/queries/getOrdonnancesByUser"

const OrdonnanceComp = () => {
  const currentUser = useCurrentUser()
  const [ordonnances] = useQuery(getOrdonnances, null)

  console.log("ordonnances component", ordonnances)
  if (!currentUser) {
    return null
  } else {
    return (
      <div>
        <div className="flex flex-wrap mt-10 r w-720 bg-transparent tracking-wide  font-bold    inline-flex ">
          <div className="m-3 w-[85px] text-[#172048]">
            <a>Utilisé</a>
          </div>
          <div className="m-3 text-[#172048] w-[230px]">
            <a>Date de prescription</a>
          </div>
          <div className="m-3 text-[#172048]">
            <a>Médecin</a>
          </div>
        </div>
        {ordonnances?.map((ordonnance) => (
          <div
            key={ordonnance.id}
            className="flex flex-wrap mt-10 justify-center w-[975px] bg-white font-bold rounded shadow-md py-2 px-6 inline-flex items-center"
          >
            <div className="m-3 w-[75px]  flex-none">
              <a>x</a>
            </div>
            <div className=" flex-none text-[#188CA5] w-[250px] ">
              <a>{ordonnance.createdAt.toLocaleDateString("fr-FR")}</a>
            </div>
            <div className=" flex-none text-[#188CA5] w-[200px]">
              <a>Dr.{ordonnance.medecin.user.lastName}</a>
            </div>
            <div className=" flex-none mr-6 text-[#979797] w-[200px]">
              <a>{ordonnance.prescriptionFile}</a>
            </div>
            <div className=" flex-none w-[75px]">
              <PrintIcon className="text-[#188CA5] mr-4 w-15 h-15" />
            </div>
            <div className=" flex-none w-[75px]">
              <DownloadIcon className="text-[#188CA5] mr-4 w-15 h-15" />
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const GetOrdonnances = () => {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <OrdonnanceComp />
    </Suspense>
  )
}

export default GetOrdonnances
