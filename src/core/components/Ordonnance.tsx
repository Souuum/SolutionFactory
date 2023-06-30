import { List, ListItem, Card, Typography } from "@material-tailwind/react"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import updatePatient from "src/pages/patient/mutations/updateUser"
import React, { useState } from "react"
import "@fontsource/poppins"
import { loadBlitzRpcResolverFilesWithInternalMechanism, useMutation, useQuery } from "@blitzjs/rpc"
import PrintIcon from "@mui/icons-material/Print"
import DownloadIcon from "@mui/icons-material/Download"

export default function Ordonnance() {
  const currentUser = useCurrentUser()
  const [editing, setEditing] = useState(false)
  const [updatePatientMutation] = useMutation(updatePatient)

  if (!currentUser) {
    return null
  } else {
    return (
      <div className="flex flex-wrap mt-10 justify-center w-[975px] bg-white font-bold rounded shadow-md py-2 px-6 inline-flex items-center">
        <div className="m-3 w-[75px]  flex-none">
          <a>x</a>
        </div>
        <div className=" flex-none text-[#188CA5] w-[250px] ">
          <a>01/01/2023</a>
        </div>
        <div className=" flex-none text-[#188CA5] w-[200px]">
          <a>Dr.Docteur</a>
        </div>
        <div className=" flex-none mr-6 text-[#979797] w-[200px]">
          <a>ordonnance.pdf</a>
        </div>
        <div className=" flex-none w-[75px]">
          <PrintIcon className="text-[#188CA5] mr-4 w-15 h-15" />
        </div>
        <div className=" flex-none w-[75px]">
          <DownloadIcon className="text-[#188CA5] mr-4 w-15 h-15" />
        </div>
      </div>
    )
  }
}
