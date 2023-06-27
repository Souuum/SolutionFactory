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
        label="Numéro RPPS"
        placeholder="XXXXXXXXXXX"
        pattern="[0-9]{11}"
      />
      <LabeledTextField name="cabinet" label="Cabinet" placeholder="Adresse, ville, code postal" />
      <LabeledTextField name="specialty" label="Spécialité" placeholder="Spécialité du médecin" />
    </div>
  )
}

export default MedecinSignupForm
