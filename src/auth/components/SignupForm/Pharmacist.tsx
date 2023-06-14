import { LabeledTextField } from "src/core/components/LabeledTextField"
import React from "react"

type PharmacistSignupFormProps = {
  onSuccess?: () => void
}

export const PharmacistSignupForm = (props: PharmacistSignupFormProps) => {
  return (
    <LabeledTextField
      name="rpps"
      label="Numero RPPS"
      placeholder="XXXXXXXXXXX"
      pattern="[0-9]{11}"
    />
  )
}

export default PharmacistSignupForm
