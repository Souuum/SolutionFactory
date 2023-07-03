import { LabeledTextField } from "src/core/components/LabeledTextField"
import React from "react"

type MedecinSignupFormProps = {
  onSuccess?: () => void
}

export const MedecinSignupForm = (props: MedecinSignupFormProps) => {
  return (
    <div>
      <LabeledTextField
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700  w-1/2 border-solid appearance-none mb-4"
        name="rpps"
        label="Numéro RPPS"
        placeholder="XXXXXXXXXXX"
        pattern="[0-9]{11}"
      />
      <LabeledTextField
        name="cabinet"
        label="Cabinet"
        placeholder="Adresse, ville, code postal"
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700  w-1/2 border-solid appearance-none  mt-3 mb-4"
      />
      <LabeledTextField
        name="specialty"
        label="Spécialité"
        placeholder="Spécialité du médecin"
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700  w-1/2 border-solid appearance-none  mt-3 mb-4"
      />
      <LabeledTextField
        name="numRue"
        label="Numéro de rue"
        placeholder="Numéro de rue"
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700  w-1/2 border-solid appearance-none  mt-3 mb-4"
      />
      <LabeledTextField
        name="nomRue"
        label="Rue"
        placeholder="Rue"
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700  w-1/2 border-solid appearance-none  mt-3 mb-4"
      />
      <LabeledTextField
        name="codePostal"
        label="Code postal"
        placeholder="Code postal"
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700  w-1/2 border-solid appearance-none  mt-3 mb-4"
      />
      <LabeledTextField
        name="ville"
        label="Ville"
        placeholder="Ville"
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700  w-1/2 border-solid appearance-none  mt-3 mb-4"
      />
    </div>
  )
}

export default MedecinSignupForm
