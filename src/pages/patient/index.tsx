import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"

import NavBar from "src/core/components/NavBar"
import UserProfile from "src/core/components/patient/UserProfile"

import Ordonnance from "src/core/components/Ordonnance"
import { Navbar, MobileNav, Typography, Button, IconButton, Card } from "@material-tailwind/react"
import MesPrescriptions from "src/core/components/patient/MesPrescriptions"
import MesOrdonnances from "src/core/components/patient/MesOrdonnances"
import MonGroupe from "src/core/components/patient/MonGroupe"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserOrd = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Ordonnance />
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.LoginPage()}>
          <Button
            variant="gradient"
            size="sm"
            className="drop-shadow-lg hidden lg:inline-block bg-[#188CA5] rounded-full text-white font-Poppins text-2xl"
          >
            <span>Se connecter</span>
          </Button>
        </Link>
      </>
    )
  }
}

const HomePatient: BlitzPage = () => {
  var [currentUser, setCurrentUser] = useState<any>(null)
  useEffect(() => {
    console.log("navbar", currentUser)
  }, [currentUser])

  return (
    <div>
      <NavBar setCurrentUser={setCurrentUser} />
      <div className=" mt-12 ml-12">
        <div className="mb-8">
          <MesPrescriptions setCurrentUser={setCurrentUser} currentUser={currentUser} />
        </div>
        <div className="mb-8">
          <MesOrdonnances setCurrentUser={setCurrentUser} currentUser={currentUser} />
        </div>
        <div>
          <MonGroupe setCurrentUser={setCurrentUser} currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}

export default HomePatient
