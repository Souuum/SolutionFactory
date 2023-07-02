import { LabeledTextField } from "src/core/components/LabeledTextField"
import React from "react"

type PharmacistSignupFormProps = {
  onSuccess?: () => void
}

export const PharmacistSignupForm = (props: PharmacistSignupFormProps) => {
  return (
    <div>
      <LabeledTextField
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700  w-1/2 border-solid appearance-none mb-4 "
        name="rpps"
        label="Numéro RPPS"
        placeholder="XXXXXXXXXXX"
        pattern="[0-9]{11}"
      />
      <LabeledTextField
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700  w-1/2 border-solid appearance-none  mt-3 mb-4"
        name="pharmacy"
        label="Pharmacy"
        placeholder="Adresse, ville, code postal"
      />
    </div>
  )
}

export default PharmacistSignupForm
