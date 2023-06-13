import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import signup from "src/auth/mutations/signup"
import { Signup } from "src/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import React from "react"

type UserSignupFormProps = {
  onSuccess?: () => void
}

export const UserSignupForm = (props: UserSignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  return (
    <div>
      <Form
        submitText="Create Account"
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          console.log(values)
          values.role = "PATIENT"
          values.gender = "MAN"
          values.birthDate = new Date(values.birthDate)
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="firstName" label="Firstname" placeholder="Firstname" />
        <LabeledTextField name="lastname" label="Lastname" placeholder="Lastname" />
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
      </Form>
    </div>
  )
}
export default UserSignupForm
