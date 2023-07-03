import { BlitzPage, useParams } from "@blitzjs/next"
import Link from "next/link"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import Layout from "src/core/layouts/Layout"
import { Routes } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import { Suspense } from "react"
import { useMutation } from "@blitzjs/rpc"
import { useCurrentPatient } from "src/patient/hooks/useCurrentPatient"
import { useEffect, useState } from "react"
import { useCurrentMedecin } from "src/medecin/hooks/useCurrentMedecin"
import { usePatientOrdonnances } from "src/ordonnances/hooks/usePatientOrdonnances"
import OrdonnanceView from "src/ordonnances/components/OrdonnanceView"
import { Typography } from "@mui/material"
import NavBar from "src/core/components/NavBar"

const StatusWrapper = () => {
  const currentUser = useCurrentUser()
  const currentMedecin = useCurrentMedecin()
  const createdBy = currentMedecin?.id
  const [logoutMutation] = useMutation(logout)
  const [patientId, setPatientId] = useState(null)

  const paramId = useParams("number")

  const [selectedOrdonnanceType, setSelectedOrdonnanceType] = useState("")

  useEffect(() => {
    setPatientId(paramId.id)
  }, [paramId])

  const patient = useCurrentPatient(paramId.id)
  const ordonnances = usePatientOrdonnances(paramId.id)

  if (currentUser) {
    return (
      <>
        <div className="top-0 left-0 fixed"></div>
        <div className="flex flex-col justify-center items-center w-screen">
          <div></div>
          <div className="flex justify-center w-screen">
            <div className="">
              <Typography className="text-[#172048] text-3xl mb-5 font-bold ml-3 mt-5">
                Ordonnances
              </Typography>
              <div className="flex flex-wrap mt-10 r w-720 bg-transparent tracking-wide  font-bold    inline-flex ">
                <div className="m-3 w-[85px] text-[#172048]">
                  <a>Utilisé</a>
                </div>
                <div className="m-3 text-[#172048] w-[230px]">
                  <a>Date de prescription</a>
                </div>
                <div className="m-3 text-[#172048]">
                  <a>Médecin</a>
                </div>
              </div>

              <OrdonnanceView ordonnances={ordonnances} />
            </div>
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

const PatientOrdonnance: BlitzPage = () => {
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

export default PatientOrdonnance
