import { Form, FORM_ERROR } from "src/core/components/Form"
import { useMutation } from "@blitzjs/rpc"
import createOrdonnance from "src/medecin/mutations/createOrdonnance"
import createPrescription from "src/medecin/mutations/createPrescription"

import PrescriptionForm from "src/medecin/components/prescriptionForm"

type OrdonnanceFormProps = {
  role?: string | string[] | undefined
  onSuccess?: () => void
}

export const OrdonnanceForm = (props: OrdonnanceFormProps) => {
  const [createOrdonnanceMutation] = useMutation(createOrdonnance)
  const [createPrescriptionMutation] = useMutation(createPrescription)

  return (
    <div>
      <Form
        submitText="Create Ordonnance"
        initialValues={{ date: "", patientId: "" }}
        onSubmit={async (values) => {
          values.date = new Date(values.date)
          try {
            const ordonnance = await createOrdonnanceMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <div>
          <label htmlFor="date">Date</label>
          <input id="date" type="date" name="date" placeholder="Date" />
        </div>
        <div>
          <label htmlFor="patientId">Patient Id</label>
          <input id="patientId" type="text" name="patientId" placeholder="Patient Id" />
        </div>
      </Form>
    </div>
  )
}
