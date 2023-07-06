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
        <div className=" mt-8 pt-8 flex flex-col   items-center h-screen ">
          <h1 className="text-[#172048] text-3xl mb-8 font-bold "> Lire une ordonnance</h1>
          <div>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Entrer le code"
              className="p-2 border border-gray-400 rounded"
            />
            <button
              onClick={handleClick}
              className="ml-2 px-4 py-2 drop-shadow-lg hidden lg:inline-block bg-[#188CA5]  text-white font-Poppins text-base"
            >
              Voir l'ordonnance
            </button>
            {showOrdonnanceDetails && <OrdonnanceDetails token={token} />}
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
