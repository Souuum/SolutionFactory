import Page404 from "../../pages/404"
import React from "react"
import UserSignupForm from "./SignupForm/User"
import PharmacistSignupForm from "./SignupForm/Pharmacist"
import MedecinSignupForm from "./SignupForm/Medecin"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"

type SignupFormProps = {
  role?: string | string[] | undefined
}

export const SignupForm = (props: SignupFormProps) => {
  const router = useRouter()
  return (
    <div>
      <h1>Create an Account</h1>
      <UserSignupForm onSuccess={() => router.push(Routes.HomePatient())} />
      {props.role == "pharmacien" ? (
        <PharmacistSignupForm onSuccess={() => router.push(Routes.HomePharmacist())} />
      ) : null}
      {props.role == "medecin" ? (
        <MedecinSignupForm onSuccess={() => router.push(Routes.HomeMedecin())} />
      ) : null}
    </div>
  )
}

export default SignupForm
