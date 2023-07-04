import { LabeledTextField } from "src/core/components/LabeledTextField"
import React from "react"

type PharmacistSignupFormProps = {
  onSuccess?: () => void
}

export const PharmacistSignupForm = (props: PharmacistSignupFormProps) => {
  return (
    <div>
      <LabeledTextField
        name="rpps"
        label="Numéro RPPS"
        placeholder="XXXXXXXXXXX"
        pattern="[0-9]{11}"
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700 border-solid appearance-none  mt-3 mb-4"
      />
      <LabeledTextField
        name="pharmacy"
        label="Pharmacy"
        placeholder="Adresse, ville, code postal"
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700 border-solid appearance-none  mt-3 mb-4"
      />
    </div>
  )
}

export default PharmacistSignupForm
