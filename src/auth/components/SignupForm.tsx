import React from "react"
import UserSignupForm from "./SignupForm/User"
import PharmacistSignupForm from "./SignupForm/Pharmacist"
import MedecinSignupForm from "./SignupForm/Medecin"
import { Form, FORM_ERROR } from "src/core/components/Form"
import signup from "src/auth/mutations/signup"
import { useMutation } from "@blitzjs/rpc"
import createPatient from "src/pages/patient/mutations/createPatient"

type SignupFormProps = {
  role?: string | string[] | undefined
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [createPatientMutation] = useMutation(createPatient)

  return (
    <div>
      <Form
        submitText="Create Account"
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          values.role = "PATIENT"
          values.gender = "MAN"
          values.birthDate = new Date(values.birthDate)
          try {
            await signupMutation(values)
            if (props.role == "patient") {
              try {
                console.log(signupMutation)
                await createPatientMutation(values)
                props.onSuccess?.()
              } catch (error: any) {
                if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                  // This error comes from Prisma
                  return { email: "This email is already being used" }
                } else {
                  return { [FORM_ERROR]: error.toString() }
                }
              }
            }
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
        <h1>Create an Account</h1>
        <UserSignupForm />
        {props.role == "pharmacien" ? <PharmacistSignupForm /> : null}
        {props.role == "medecin" ? <MedecinSignupForm /> : null}
      </Form>
    </div>
  )
}

export default SignupForm
