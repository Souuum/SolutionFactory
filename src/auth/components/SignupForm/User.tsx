import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import signup from "src/auth/mutations/signup"
import { Signup } from "src/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import React from "react"

export const UserSignupForm = (props) => {
  return (
    <div>
      <LabeledTextField name="firstName" label="Firstname" placeholder="Firstname" />
      <LabeledTextField name="lastName" label="Lastname" placeholder="Lastname" />
      <LabeledTextField name="birthDate" label="Birthdate" type="date" />
      <LabeledTextField name="email" label="Email" placeholder="Email" />
      <LabeledTextField
        name="phone"
        label="Phone number"
        placeholder="0XXXXXXXXX"
        type="tel"
        pattern="[0-9]{10}"
      />
      <LabeledTextField
        name="securityNumber"
        label="Security number"
        placeholder="XXXXXXXXXXXXX"
        pattern="[0-9]{13}"
      />
      <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      <button type="submit" />
    </div>
  )
}
export default UserSignupForm
