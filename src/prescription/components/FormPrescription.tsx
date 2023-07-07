import { Drug } from "@prisma/client"
import { number } from "zod"
import { Form, FORM_ERROR } from "src/core/components/Form"
import LabeledTextField from "src/core/components/LabeledTextField"
import { z } from "zod"
import { useState } from "react"
import styles from "src/styles/Home.module.css"
import { useMutation } from "@tanstack/react-query"
import createOrdonnance from "src/medecin/mutations/createOrdonnance"
import createPrescription from "../mutations/createPrescription"

type PrescriptionProps = {
  patientId?: number
  patientAge?: number
  createdBy?: number
  selectedOrdonnanceType?: string
}

const prescription = z.object({
  ordonnanceId: z.number(),
  patientId: z.number(),
  description: z.string().trim(),
  morning: z.number().nonnegative(),
  afternoon: z.number().nonnegative(),
  evening: z.number().nonnegative(),
  expiration: z.number().nonnegative(),
  expirationTime: z.date(),
  drug: z.string(),
})

const expirationType = {
  delivrance: 90,
  chronique: 270,
  dispositif: 365,
  examen: {
    16: 365,
    42: 1825,
    43: 1095,
  },
  orthophonie: 9999999,
}

const FormPrescription = (props: PrescriptionProps) => {
  const [prescriptions, setPrescriptions] = useState([
    {
      drug: "",
      description: "",
      morning: 0,
      afternoon: 0,
      evening: 0,
      expiration: 0,
      expirationTime: new Date(),
    }, // Initial prescription item
  ])

  const handleAddPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      {
        drug: "",
        description: "",
        morning: 0,
        afternoon: 0,
        evening: 0,
        expiration: 0,
        expirationTime: new Date(),
      },
    ])
  }

  const handlePrescriptionChange = (index, field, value) => {
    const updatedPrescriptions = prescriptions.map((prescription, i) => {
      if (index === i) {
        return { ...prescription, [field]: value }
      }
      return prescription
    })
    console.log(updatedPrescriptions)
    setPrescriptions(updatedPrescriptions)
  }

  const handleRemovePrescription = (index) => {
    const updatedPrescriptions = prescriptions.filter((_, i) => index !== i)
    setPrescriptions(updatedPrescriptions)
  }

  const calculateExpirationTime = (expirationDays) => {
    const expirationTime = new Date()
    expirationTime.setDate(expirationTime.getDate() + parseInt(expirationDays))
    return expirationTime
  }

  const isEmptyPrescription = (prescription) => {
    return (
      !props.selectedOrdonnanceType ||
      !prescription.drug ||
      !prescription.description ||
      prescription.morning === undefined ||
      prescription.afternoon === undefined ||
      prescription.evening === undefined ||
      !prescription.expirationTime
    )
  }

  const handleSubmit = async (values) => {
    console.log("clicked")
    const createdPrescriptions = []
    try {
      if (prescriptions.some((prescription) => isEmptyPrescription(prescription))) {
        console.log(prescriptions)
        console.error("One or more prescriptions are empty or prescription type is missing")
        return // Don't proceed with API call if any prescription is empty
      }
      console.log(props)
      const ordonnancetype = props.selectedOrdonnanceType
      console.log(ordonnancetype)
      let ordonnanceExpiration = 0
      if (ordonnancetype == "type4") {
        const age = props.patientAge
        ordonnanceExpiration =
          age < 16
            ? expirationType["type4"][16]
            : age < 42
            ? expirationType["type4"][42]
            : expirationType["type4"][43]
      } else {
        ordonnanceExpiration = expirationType[props.selectedOrdonnanceType]
      }
      console.log(ordonnanceExpiration)
      const ordonnanceExpirationDate = calculateExpirationTime(ordonnanceExpiration)
      console.log(ordonnanceExpirationDate)

      const ordonnanceProps = {
        createdBy: props.createdBy,
        patientId: props.patientId,
        category: props.selectedOrdonnanceType,
        expiration: ordonnanceExpirationDate,
      }
      const ordonnance = await createOrdonnance(ordonnanceProps)

      for (const prescription of prescriptions) {
        const props = {
          ordonnanceId: ordonnance.id,
          drug: prescription.drug,
          description: prescription.description,
          morning: parseInt(prescription.morning),
          afternoon: parseInt(prescription.afternoon),
          evening: parseInt(prescription.evening),
          expirationTime: calculateExpirationTime(prescription.expiration),
        }

        const createdPrescription = await createPrescription(props)
        createdPrescriptions.push(createdPrescription)
      }

      console.log(createdPrescriptions)
      alert("L'ordonnance a été créée")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Form
        submitText=<span className="text-white">Créer l'ordonnance</span>
        schema={prescription}
        initialValues={{
          ordonnanceId: 0,
          patientId: props.patientId || 0,
          description: "",
          morning: 0,
          afternoon: 0,
          evening: 0,
          expiration: 0,
          expirationTime: new Date(),
          drug: "",
        }}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-3">
          {prescriptions.map((prescription, index) => (
            <div key={index} className="flex flex-col p-4 m-1 rounded-lg ">
              <LabeledTextField
                className="w-96 text-base py-1 px-2 rounded border-b border-b-cyan-700 w-1/2 max-w-xs border-solid appearance-none mt-2"
                name={`drug-${index}`}
                label="médicament"
                placeholder="médicament"
                value={prescription.drug}
                onChange={(e) => handlePrescriptionChange(index, "drug", e.target.value)}
              />
              <LabeledTextField
                className="w-96 text-base py-1 px-2 rounded border-b border-b-cyan-700 w-1/2 max-w-xs border-solid appearance-none mt-2"
                name={`description-${index}`}
                label="description"
                placeholder="description"
                value={prescription.description}
                onChange={(e) => handlePrescriptionChange(index, "description", e.target.value)}
              />
              <div className="flex flex-row justify-between">
                <LabeledTextField
                  className="w-12 text-base py-1 px-2 rounded border-b border-b-cyan-700 w-12  border-solid appearance-none mt-2"
                  name={`morning-${index}`}
                  label="matin"
                  placeholder="morning"
                  value={prescription.morning}
                  onChange={(e) => handlePrescriptionChange(index, "morning", e.target.value)}
                />
                <LabeledTextField
                  className="w-12 text-base py-1 px-2 rounded border-b border-b-cyan-700 w-12 border-solid appearance-none mt-2"
                  name={`afternoon-${index}`}
                  label="après-midi"
                  placeholder="afternoon"
                  value={prescription.afternoon}
                  onChange={(e) => handlePrescriptionChange(index, "afternoon", e.target.value)}
                />
                <LabeledTextField
                  className="w-12 text-base py-1 px-2 rounded border-b border-b-cyan-700  w-12 border-solid appearance-none mt-2"
                  name={`evening-${index}`}
                  label="soir"
                  placeholder="evening"
                  value={prescription.evening}
                  onChange={(e) => handlePrescriptionChange(index, "evening", e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between">
                <LabeledTextField
                  className="w-12 text-base py-1 px-2 rounded border-b border-b-cyan-700  w-12 border-solid appearance-none mt-2"
                  name={`expiration-${index}`}
                  label="Durée du traitement en jour"
                  placeholder="expiration"
                  value={prescription.expiration}
                  onChange={(e) => handlePrescriptionChange(index, "expiration", e.target.value)}
                />
                <button onClick={() => handleRemovePrescription(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 0 24 24"
                    width="24px"
                    fill="#90A4AE"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M19 13H5v-2h14v2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <button onClick={handleAddPrescription}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#90A4AE"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </button>
        </div>
      </Form>
    </div>
  )
}

export default FormPrescription
