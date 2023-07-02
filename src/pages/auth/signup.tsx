import Layout from "src/core/layouts/Layout"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { ResetPassword } from "src/auth/schemas"
import resetPassword from "src/auth/mutations/resetPassword"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { assert } from "blitz"
import NavBar from "../../core/components/NavBar"
import React, { Suspense, useEffect, useState } from "react"
import getToken from "src/token/queries/getToken"
import UserSignupForm from "src/auth/components/SignupForm/User"
import signup from "src/auth/mutations/signup"
import signupPatient from "src/auth/mutations/signup/signupPatient"

const SignupPageGroupeComponent = () => {
  const router = useRouter()
  const token = router.query.token?.toString()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)
  const [tokenInfo] = useQuery(getToken, token!)
  var [currentUser, setCurrentUser] = useState<any>(null)
  const [signupMutation] = useMutation(signup)
  const [createPatientMutation] = useMutation(signupPatient)
  const [selectedGender, setSelectedGender] = useState("")

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value)
    console.log(selectedGender)
  }

  useEffect(() => {
    console.log("token", tokenInfo)
    console.log("navbar", currentUser)
  }, [currentUser, tokenInfo])

  return (
    <div className="h-screen bg-sky-100">
      <div className="items-center justify-center">
        <div className="flex items-center justify-center">
          <NavBar setCurrentUser={setCurrentUser} />
        </div>
        <div className="my-48">
          <div className="flex items-center justify-center">
            {isSuccess ? (
              <div>
                <h2>Compte créer avec succés</h2>
                <p>
                  Go to the <Link href={Routes.HomePatient()}>Page d'accueil</Link>
                </p>
              </div>
            ) : (
              <Form
                className="w-1/2 p-4"
                submitText="Créer un compte"
                initialValues={{ email: tokenInfo!.sentTo }}
                onSubmit={async (values) => {
                  values.role = "PATIENT"
                  values.birthDate = new Date(values.birthDate)
                  try {
                    console.log("gender", values.gender)
                    const userProperties = {
                      email: tokenInfo!.sentTo,
                      phone: values.phone,
                      password: values.password,
                      role: values.role,
                      firstName: values.firstName,
                      lastName: values.lastName,
                      birthDate: values.birthDate,
                      gender: selectedGender as any,
                    }
                    const user = await signupMutation(userProperties)
                    try {
                      const patient = {
                        userId: user.id,
                        securityNumber: values.securityNumber,
                        groupeId: tokenInfo!.groupeId!,
                      }
                      await createPatientMutation(patient)
                    } catch (error: any) {
                      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                        // This error comes from Prisma
                        return { email: "L'utilisateur existe déja" }
                      } else {
                        return { [FORM_ERROR]: error.toString() }
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
                <LabeledTextField name="firstName" label="Prénom" placeholder="Prénom" />
                <LabeledTextField name="lastName" label="Nom" placeholder="Nom" />
                <label className="text-gray-700">
                  Genre
                  <select
                    name="gender"
                    id="gender"
                    className="block px-3 py-2 border-b border-cyan-700 bg-sky-100 rounded-md shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    value={selectedGender}
                    onChange={handleGenderChange}
                  >
                    <option value="">Choisir une option</option>
                    <option value="WOMAN">Femme</option>
                    <option value="MAN">Homme</option>
                  </select>
                </label>
                <LabeledTextField name="birthDate" label="Date de naissance" type="date" />
                <LabeledTextField
                  name="phone"
                  label="Numéro de téléphone"
                  placeholder="0XXXXXXXXX"
                  type="tel"
                  pattern="[0-9]{10}"
                />
                <LabeledTextField
                  name="password"
                  label="Mot de passe"
                  placeholder="Mot de passe"
                  type="password"
                />
                <LabeledTextField
                  name="securityNumber"
                  label="Numéro de Sécurité Sociale"
                  placeholder="XXXXXXXXXXXXX"
                  pattern="[0-9]{13}"
                />
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const SignupPageGroupe: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <SignupPageGroupeComponent />
      </Suspense>
    </div>
  )
}
export default SignupPageGroupe
