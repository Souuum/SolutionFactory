import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import signup from "src/auth/mutations/signup"
import { Signup } from "src/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import React from "react"

type MedecinSignupFormProps = {
  onSuccess?: () => void
}

export const MedecinSignupForm = (props: MedecinSignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  return (
    <div>
      <LabeledTextField
        name="rpps"
        label="Numero RPPS"
        placeholder="XXXXXXXXXXX"
        pattern="[0-9]-{11}"
      />
      <LabeledTextField
        name="cabinet"
        label="Doctor's Office"
        placeholder="address, city, postal code"
      />
    </div>
  )
}

export default MedecinSignupForm
