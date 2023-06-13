import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import signup from "src/auth/mutations/signup"
import { Signup } from "src/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import Page404 from "../../pages/404"
import React from "react"

type SignupFormProps = {
  onSuccess?: () => void
  role: string | string[] | undefined
}

export const User = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  React.useEffect(() => {
    console.log(signupMutation)
  }, [signupMutation])
  return (
    <Form
      submitText="Create Account"
      schema={Signup}
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        console.log("baznnr")
        values.role = "PATIENT"
        values.gender = "HOMME"
        try {
          console.log(values)
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
      <LabeledTextField name="firstname" label="Firstname" placeholder="Firstname" />
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
      <LabeledTextField name="securityNumber" label="Social Security Number" placeholder="XXX" />
      <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
    </Form>
  )
}

export const Medecin = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  return (
    <Form
      submitText="Create Account"
      schema={Signup}
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
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
    </Form>
  )
}

export const Pharmacien = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  return (
    <Form
      submitText="Create Account"
      schema={Signup}
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
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
      <LabeledTextField
        name="rpps"
        label="Numero RPPS"
        placeholder="XXXXXXXXXXX"
        pattern="[0-9]-{11}"
      />
    </Form>
  )
}

export const SignupForm = (props: SignupFormProps) => {
  return (
    <div>
      <User role="patient" />
      {props.role == "pharmacien" ? <Pharmacien role="pharmacien" /> : null}
      {props.role == "medecin" ? <Medecin role="medecin" /> : null}
    </div>
  )
}

export default SignupForm
