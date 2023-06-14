import { LabeledTextField } from "src/core/components/LabeledTextField"
import React from "react"

type MedecinSignupFormProps = {
  onSuccess?: () => void
}

export const MedecinSignupForm = (props: MedecinSignupFormProps) => {
  return (
    <div>
      <LabeledTextField
        name="rpps"
        label="Numero RPPS"
        placeholder="XXXXXXXXXXX"
        pattern="[0-9]{11}"
      />
      <LabeledTextField
        name="cabinet"
        label="Doctor's Office"
        placeholder="address, city, postal code"
      />
      <LabeledTextField name="specialty" label="Spécialité" placeholder="Spécialité du médecin" />
    </div>
  )
}

export default MedecinSignupForm
