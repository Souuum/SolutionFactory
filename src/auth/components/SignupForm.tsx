import React, { useState } from "react"
import UserSignupForm from "./SignupForm/User"
import PharmacistSignupForm from "./SignupForm/Pharmacist"
import MedecinSignupForm from "./SignupForm/Medecin"
import { Form, FORM_ERROR } from "src/core/components/Form"
import signup from "src/auth/mutations/signup"
import { useMutation } from "@blitzjs/rpc"
import createPatient from "src/pages/patient/mutations/createPatient"
import createMedecin from "src/pages/medecin/mutations/createMedecin"
import createPharmacist from "src/pages/pharmacist/mutations/createPharmacist"
import Navbar from "../../core/components/NavBar"
import createGroupe from "src/groupe/mutations/createGroupe"

type SignupFormProps = {
  role?: string | string[] | undefined
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [createPatientMutation] = useMutation(createPatient)
  const [createMedecinMutation] = useMutation(createMedecin)
  const [createPharmacistMutation] = useMutation(createPharmacist)
  const [createGroupeMutation] = useMutation(createGroupe)

  const [selectedValue, setSelectedValue] = useState("")

  const handleSelectChange = (value) => {
    setSelectedValue(value)
  }

  return (
    <div className="h-screen bg-sky-100">
      <div className="flex items-center justify-center">
        <Navbar />
      </div>

      <div className="flex items-center justify-center">
        <div className="w-1/2 p-4 mx-auto">
          <h1 className="text-4xl text-center font-bold"> Bienvenue </h1>
        </div>
        <Form
          className="w-1/2 p-4"
          submitText="Créer un compte"
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            if (props.role?.toString().toUpperCase() == "PHARMACIEN") {
              values.role = "PHARMACIST"
            } else {
              values.role = props.role?.toString().toUpperCase()
            }
            values.gender = selectedValue
            values.birthDate = new Date(values.birthDate)
            try {
              const user = await signupMutation(values)
              if (props.role == "patient") {
                const groupe = createGroupeMutation()
                try {
                  const patient = {
                    userId: user.id,
                    securityNumber: values.securityNumber,
                    groupeId: groupe.id,
                  }
                  await createPatientMutation(patient)
                  props.onSuccess?.()
                } catch (error: any) {
                  if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                    // This error comes from Prisma
                    return { email: "L'adresse mail est déjà utilisé." }
                  } else {
                    return { [FORM_ERROR]: error.toString() }
                  }
                }
              } else if (props.role == "medecin") {
                try {
                  const medecin = {
                    userId: user.id,
                    rpps: values.rpps,
                    cabinet: values.cabinet,
                    specialty: values.specialty,
                  }
                  await createMedecinMutation(medecin)
                  props.onSuccess?.()
                } catch (error: any) {
                  if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                    // This error comes from Prisma
                    return { email: "L'adresse mail est déjà utilisé." }
                  } else {
                    return { [FORM_ERROR]: error.toString() }
                  }
                }
              } else if (props.role == "pharmacien") {
                try {
                  const pharmacist = {
                    userId: user.id,
                    rpps: values.rpps,
                  }
                  await createPharmacistMutation(pharmacist)
                  props.onSuccess?.()
                } catch (error: any) {
                  if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                    // This error comes from Prisma
                    return { email: "L'adresse mail est déjà utilisé." }
                  } else {
                    return { [FORM_ERROR]: error.toString() }
                  }
                }
              }
            } catch (error: any) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                // This error comes from Prisma
                return { email: "L'adresse mail est déjà utilisé." }
              } else {
                return { [FORM_ERROR]: error.toString() }
              }
            }
          }}
        >
          <h1 className="text-3xl my-3">Nouveau Compte</h1>
          <UserSignupForm onSelectChange={handleSelectChange} />
          {props.role == "pharmacien" ? <PharmacistSignupForm /> : null}
          {props.role == "medecin" ? <MedecinSignupForm /> : null}
        </Form>
      </div>
    </div>
  )
}

export default SignupForm
