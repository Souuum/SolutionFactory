import { useState } from "react"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { useMutation } from "@blitzjs/rpc"
import createPrescription from "src/medecin/mutations/createPrescription"
//import { Table, TableRow, TableCell } from "src/core/components/Table"
import LabeledTextField from "src/core/components/LabeledTextField"
import { PrescriptionTable, TableCell, TableRow } from "./PrescriptionTable"
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
    let patientId = values.patientId
    let description = values.description

    const prescription = {
      patientId: patientId,
      drugId: drugId,
      description: description,
    }

    setPrescriptions((prevPrescriptions) => [...prevPrescriptions, prescription])
    console.log(prescriptions)
  }

  return (
    <div>
      <Form
        submitText="Add prescription"
        initialValues={{ drugId: "", description: "", patientId: "" }}
        onSubmit={handleSuccess}
      >
        <LabeledTextField name="patientId" label="Patient Id" placeholder="Patient Id" />
        <LabeledTextField name="drugId" label="Drug Id" placeholder="Drug Id" />
        <LabeledTextField name="description" label="Description" placeholder="Description" />
      </Form>

      {/* Display prescriptions in a table */}
      <PrescriptionTable prescriptions={prescriptions} />
    </div>
  )
}
