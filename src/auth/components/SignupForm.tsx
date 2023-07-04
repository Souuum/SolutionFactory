import React, { useEffect, useState } from "react"
import UserSignupForm from "./SignupForm/User"
import PharmacistSignupForm from "./SignupForm/Pharmacist"
import MedecinSignupForm from "./SignupForm/Medecin"
import { Form, FORM_ERROR } from "src/core/components/Form"
import signup from "src/auth/mutations/signup"
import { useMutation } from "@blitzjs/rpc"
import signupPatient from "src/auth/mutations/signup/signupPatient"
import signupMedecin from "src/auth/mutations/signup/signupMedecin"
import signupPharmacist from "src/auth/mutations/signup/signupPharmacist"
import Navbar from "../../core/components/NavBar"
import createGroupe from "src/groupe/mutations/createGroupe"
import LabeledTextField from "src/core/components/LabeledTextField"
import { Suspense } from "react"

type SignupFormProps = {
  role?: string | string[] | undefined
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)
  const [createPatientMutation] = useMutation(signupPatient)
  const [createMedecinMutation] = useMutation(signupMedecin)
  const [createPharmacistMutation] = useMutation(signupPharmacist)
  const [createGroupeMutation] = useMutation(createGroupe)
  var [currentUser, setCurrentUser] = useState<any>(null)
  useEffect(() => {
    console.log("navbar", currentUser)
  }, [currentUser])

  const [selectedValue, setSelectedValue] = useState("")

  const handleSelectChange = (value) => {
    setSelectedValue(value)
  }

  return (
    <>
      <Navbar setCurrentUser={setCurrentUser} />
      <div className="h-full  flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center sm:flex-row">
          <div className="w-full sm:w-1/2 p-4 mx-auto">
            <h1 className="text-6xl text-center font-bold order-first sm:order-last">Bienvenue</h1>
          </div>
          <Form
            className="w-1/2 p-4 flex flex-col litems-center justify-center mt-8 h-full"
            submitText=<span className="text-white">Créer un compte</span>
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              if (props.role?.toString().toUpperCase() == "PHARMACIEN") {
                values.role = "PHARMACIST"
              } else if (props.role?.toString().toUpperCase() == "PATIENT") {
                values.role = "SUPERPATIENT"
              } else {
                values.role = props.role?.toString().toUpperCase()
              }
              values.gender = selectedValue
              values.birthDate = new Date(values.birthDate)
              try {
                const userProperties = {
                  email: values.email,
                  phone: values.phone,
                  password: values.password,
                  role: values.role,
                  firstName: values.firstName,
                  lastName: values.lastName,
                  birthDate: values.birthDate,
                  gender: values.gender,
                }
                const user = await signupMutation(userProperties)
                if (props.role == "patient") {
                  try {
                    const groupe = await createGroupeMutation({ userId: user.id })
                    if (groupe) {
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
                    }
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
                      numRue: values.numRue,
                      nomRue: values.nomRue,
                      codePostal: values.codePostal,
                      ville: values.ville,
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
                      pharmacy: values.pharmacy,
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
            <div>
              <h1 className="text-[#172048] text-center text-3xl mb-5 font-bold mb-6 ">
                Nouveau Compte
              </h1>
              <div className="flex flex-row space-x-4">
                {" "}
                {/* Flex container */}
                <div
                  className={`${
                    props.role === "patient" ? "flex-1 justify-center items-center" : "flex-1"
                  }`}
                >
                  {/* Right column */}
                  <div
                    className={`${
                      props.role === "patient" ? "flex flex-col justify-center items-center" : ""
                    }`}
                  >
                    <UserSignupForm onSelectChange={handleSelectChange} />
                    {props.role === "patient" ? (
                      <LabeledTextField
                        className="text-base py-1 px-2 bg-transparent border-b border-b-cyan-700 w-1/2 border-solid appearance-none mt-2"
                        name="securityNumber"
                        label="Numéro de Sécurité Sociale"
                        placeholder="XXXXXXXXXXXXX"
                        pattern="[0-9]{13}"
                      />
                    ) : null}
                  </div>
                </div>
                {props.role !== "patient" && (
                  <div className="flex-1 mt-3.5">
                    {" "}
                    {/* Left column */}
                    {props.role === "pharmacien" ? <PharmacistSignupForm /> : null}
                    {props.role === "medecin" ? <MedecinSignupForm /> : null}
                  </div>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SignupForm
