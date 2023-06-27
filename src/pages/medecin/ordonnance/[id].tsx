import { BlitzPage } from "@blitzjs/auth"
import Link from "next/link"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { PrescriptionForm } from "src/medecin/components/prescriptionForm"
import Layout from "src/core/layouts/Layout"
import { Routes } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import { Suspense } from "react"
import { useMutation } from "@blitzjs/rpc"

const StatusWrapper = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

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
          <div>
            Connecté en tant que : <code>{currentUser.lastName + " " + currentUser.firstName}</code>
          </div>
        </div>
        <div className="flex max-w-80 justify-center ">
          <PrescriptionForm />
          <div className="">
            <button className={styles.button}>Créer l'ordonnance</button>
          </div>
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

const CreateOrdonnance: BlitzPage = () => {
  return (
    <Layout title="Ordonnance">
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
