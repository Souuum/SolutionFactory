import { Form, FORM_ERROR } from "src/core/components/Form"
import { useMutation } from "@blitzjs/rpc"
import createPrescription from "src/medecin/mutations/createPrescription"

type PrescriptionFormProps = {
  role?: string | string[] | undefined
  onSuccess?: () => void
}

export const PrescriptionForm = (props: PrescriptionFormProps) => {
  const [createPrescriptionMutation] = useMutation(createPrescription)

  return (
    <div>
      <Form
        submitText="Create Ordonnance"
        initialValues={{ drugId: "", description: "" }}
        onSubmit={async (values) => {
          values.date = new Date(values.date)
          try {
            const prescription = await createPrescriptionMutation(values)
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
