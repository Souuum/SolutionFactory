import { useState } from "react"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { useMutation } from "@blitzjs/rpc"
import createPrescription from "src/medecin/mutations/createPrescription"
import { Table, TableRow, TableCell } from "src/core/components/Table"

type PrescriptionFormProps = {
  role?: string | string[] | undefined
  onSuccess?: () => void
}

export const PrescriptionForm = (props: PrescriptionFormProps) => {
  const [createPrescriptionMutation] = useMutation(createPrescription)
  const [prescriptions, setPrescriptions] = useState([])

  const handleSuccess = async (values) => {
    let drugId = values.drugId
    let patientId = values.patientId
    let description = values.description

    const prescription = {
      patientId: patientId,
      drugId: drugId,
      description: description,
    }

    setPrescriptions((prevPrescriptions) => [...prevPrescriptions, prescription])
  }

  return (
    <div>
      <Form
        submitText="Add prescription"
        initialValues={{ drugId: "", description: "" }}
        onSubmit={handleSuccess}
      >
        {/* Your form fields */}
        <div>
          <label htmlFor="date">Date</label>
          <input id="date" type="date" name="date" placeholder="Date" />
        </div>
        <div>
          <label htmlFor="patientId">Patient Id</label>
          <input id="patientId" type="text" name="patientId" placeholder="Patient Id" />
        </div>
        <div>
          <label htmlFor="drugId">Drug Id </label>
          <input id="drugId" type="text" name="drugId" placeholder="drugId" />
        </div>
        <div>
          <label htmlFor="description">Description </label>
          <input id="description" type="text" name="description" placeholder="description" />
        </div>
      </Form>

      {/* Display prescriptions in a table */}
      <Table data={prescriptions} mutation={createPrescription}>
        {/* Table header */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Patient Id</th>
            <th>drugId</th>
            <th>description</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {prescriptions.map((prescription, index) => (
            <TableRow key={index}>
              <TableCell>{prescription.date}</TableCell>
              <TableCell>{prescription.patientId}</TableCell>
              <TableCell>{prescription.drugId}</TableCell>
              <TableCell>{prescription.description}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
