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
      />
      <LabeledTextField
        name="pharmacy"
        label="Pharmacy"
        placeholder="Adresse, ville, code postal"
      />
    </div>
  )
}

export default PharmacistSignupForm
