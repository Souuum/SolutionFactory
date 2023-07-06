import { BlitzPage, useParams } from "@blitzjs/next"
import Link from "next/link"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { PrescriptionForm } from "src/medecin/components/prescriptionForm"
import Layout from "src/core/layouts/Layout"
import { Routes } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import { Suspense } from "react"
import { useMutation } from "@blitzjs/rpc"
import { useCurrentPatient } from "src/patient/hooks/useCurrentPatient"
import { useEffect, useState } from "react"
import FormPrescription from "src/prescription/components/FormPrescription"
import { useCurrentMedecin } from "src/medecin/hooks/useCurrentMedecin"
import NavBar from "src/core/components/NavBar"

const StatusWrapper = () => {
  const currentUser = useCurrentUser()
  const currentMedecin = useCurrentMedecin()
  const createdBy = currentMedecin?.id
  const [logoutMutation] = useMutation(logout)
  const [patientId, setPatientId] = useState(1)
  const paramId = useParams("number")
  const ordonnanceTypes = [
    { value: "delivrance", label: "Délivrance de médicaments" },
    { value: "chronique", label: "maladie chronique" },
    { value: "dispositif", label: "Dispositif médical" },
    { value: "examen", label: "Prescription d'examen médical" },
    { value: "orthophonie", label: "Orthophonie" },
  ]
  const [selectedOrdonnanceType, setSelectedOrdonnanceType] = useState("")

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth)
    const currentDate = new Date()

    let ageInMilliseconds = currentDate - birthDate

    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25
    const ageInYears = ageInMilliseconds / millisecondsPerYear
    const age = Math.floor(ageInYears)

    return age
  }
  useEffect(() => {
    setPatientId(paramId.id)
  }, [paramId])

  const patient = useCurrentPatient(patientId)
  const patientAge = calculateAge(patient?.user.birthDate)
  if (currentUser) {
    return (
      <>
        <div className="top-0 left-0 fixed">
          <button
            className={styles.button}
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </button>
        </div>
        <div className="flex flex-col justify-center items-center w-screen">
          <h1 className="text-[#172048] text-3xl mb-5 font-bold "> Nouvelle ordonnance</h1>
          <h1 className="text-[#172048] text-lg mb-5 font-bold ">
            {" "}
            {patient?.user.lastName + " " + patient?.user.firstName}{" "}
          </h1>
          <div>
            <h1 className="pb-4"> Sélectionnez le type d'ordonnance </h1>
            <select
              value={selectedOrdonnanceType}
              onChange={(e) => setSelectedOrdonnanceType(e.target.value)}
            >
              <option value="">Select Ordonnance Type</option>
              {ordonnanceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center w-screen">
            <FormPrescription {...{ patientId, patientAge, createdBy, selectedOrdonnanceType }} />

            <br />
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <h1 className="text-dark text-3xl">
          Vous devez être connecté pour avoir accès à cette section
        </h1>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </>
    )
  }
}

const CreateOrdonnance: BlitzPage = () => {
  var [currentUser, setCurrentUser] = useState<any>(null)
  useEffect(() => {
    console.log("navbar", currentUser)
  }, [currentUser])
  return (
    <Layout title="Ordonnance">
      <NavBar setCurrentUser={setCurrentUser} />
      <div className="flex flex-col justify-center h-screen max-w-80">
        <main>
          <div className="">
            <Suspense fallback="Loading...">
              <StatusWrapper />
            </Suspense>
          </div>
        </main>

        <footer className=""></footer>
      </div>
    </Layout>
  )
}

export default CreateOrdonnance
