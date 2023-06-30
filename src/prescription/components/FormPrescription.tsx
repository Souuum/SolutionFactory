import { Drug } from "@prisma/client"
import { number } from "zod"
import { Form, FORM_ERROR } from "src/core/components/Form"
import LabeledTextField from "src/core/components/LabeledTextField"
import { z } from "zod"

type PrescriptionProps = {
  drugs?: Drug | Drug[]
  patientId?: number
}

const prescription = z.object({
  ordonnanceId: z.string(),
  patientId: z.number(),
  drugId: z.number(),
  description: z.string().trim(),
  drugName: z.string(),
})

const FormPrescription = (props: PrescriptionProps) => {
  return (
    <div>
      <Form
        submitText="Créer l'ordonnance"
        schema={prescription}
        initialValues={{ drugName: "", description: "" }}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        <div className="flex flex-col items-center">
          {props.drugs?.map((d) => (
            <div key={d.name}>
              <label className="w-96 text-base py-1 px-2 rounded border-b border-b-cyan-700 bg-sky-100 w-1/2 border-solid appearance-none mt-2">
                {d.name}
              </label>
              <LabeledTextField
                className="w-96 text-base py-1 px-2 rounded border-b border-b-cyan-700 bg-sky-100 w-1/2 border-solid appearance-none mt-2"
                name="description"
                label="description"
                placeholder="description"
              />
            </div>
          ))}
        </div>
      </Form>
    </div>
  )
}

export default FormPrescription
