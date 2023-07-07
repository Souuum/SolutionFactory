import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import TablePatients from "src/medecin/components/TablePatients"
import { useCurrentMedecin } from "src/medecin/hooks/useCurrentMedecin"
import NavBar from "src/core/components/NavBar"
import { useEffect, useState } from "react"
import { useSpecificOrdonnance } from "src/ordonnances/hooks/useSpecificOrdonnance"
import OrdonnanceDetails from "src/ordonnances/components/OrdonnanceDetails"
import getSpecificOrdonnance from "src/ordonnances/queries/getSpecificOrdonnance"
import { useQuery } from "@blitzjs/rpc"
import TableDrugs from "src/drug/components/TableDrugs"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const StatusWrapper = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const [token, setToken] = useState("")
  const [showOrdonnanceDetails, setShowOrdonnanceDetails] = useState(false)
  const [ordonnanceData, setOrdonnanceData] = useState(null)

  const handleClick = async () => {
    setShowOrdonnanceDetails(true)
  }

  if (currentUser) {
    return (
      <>
        <div className="flex flex-col"></div>
        <div className="flex flex-row justify-center space-x-3">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Token"
            className="ml-10 rounded-lg border-transparent appearance-none border border-gray-300 w-[240px] py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
          <button
            onClick={handleClick}
            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-700 focus:outline-none"
          >
            Récupérer l'ordonnance
          </button>
        </div>
        <div className=" mx-auto mb-10   w-[480px]">
          {showOrdonnanceDetails && <OrdonnanceDetails token={token} />}
        </div>
        <TableDrugs />
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

const ReadOrdonnance: BlitzPage = () => {
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

export default ReadOrdonnance
