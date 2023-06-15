import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import { OrdonnanceForm } from "src/medecin/components/ordonnanceForm"
import { PrescriptionForm } from "src/medecin/components/prescriptionForm"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className={styles.button}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          Connecté en tant que : <code>{currentUser.lastName + " " + currentUser.firstName}</code>
          <PrescriptionForm />
          <br />
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

const OrdonnancePage: BlitzPage = () => {
  return (
    <Layout title="Ordonnance">
      <div className="flex flex-col justify-center items-center h-screen">
        <main>
          <div className="">
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </div>
        </main>

        <footer className=""></footer>
      </div>
    </Layout>
  )
}

export default OrdonnancePage
