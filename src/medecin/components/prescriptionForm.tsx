import { useState } from "react"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { useMutation } from "@blitzjs/rpc"
import createPrescription from "src/medecin/mutations/createPrescription"
//import { Table, TableRow, TableCell } from "src/core/components/Table"
import LabeledTextField from "src/core/components/LabeledTextField"
import { PrescriptionTable, TableCell, TableRow } from "./PrescriptionTable"
import styles from "src/styles/Home.module.css"

type PrescriptionFormProps = {
  role?: string | string[] | undefined
  onSuccess?: () => void
}

export const PrescriptionForm = (props: PrescriptionFormProps) => {
  const [createPrescriptionMutation] = useMutation(createPrescription)

  const [prescriptions, setPrescriptions] = useState([])

  const handleSuccess = async (values) => {
    console.log(values)
    let drugId = values.drugId
    let description = values.description

    const prescription = {
      drugId: drugId,
      description: description,
    }

    setPrescriptions((prevPrescriptions) => [...prevPrescriptions, prescription])
    console.log(prescriptions)
  }

  return (
    <div className="flex flex-row w-8/12 justify-evenly">
      <Form
        submitText="Add prescription"
        initialValues={{ drugId: "", description: "" }}
        onSubmit={handleSuccess}
      >
        <LabeledTextField name="drugId" label="Drug Id" placeholder="Drug Id" />
        <LabeledTextField name="description" label="Description" placeholder="Description" />
      </Form>

      {/* Display prescriptions in a table */}
      <div className="">
        <PrescriptionTable prescriptions={prescriptions} />
      </div>
    </div>
  )
}
