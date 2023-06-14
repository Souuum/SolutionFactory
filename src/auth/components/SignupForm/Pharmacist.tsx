import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import signup from "src/auth/mutations/signup"
import { Signup } from "src/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import React from "react"

type PharmacistSignupFormProps = {
  onSuccess?: () => void
}

export const PharmacistSignupForm = (props: PharmacistSignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  return (
    <LabeledTextField
      name="rpps"
      label="Numero RPPS"
      placeholder="XXXXXXXXXXX"
      pattern="[0-9]-{11}"
    />
  )
}

export default PharmacistSignupForm
