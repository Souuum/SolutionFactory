import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"

import NavBar from "src/core/components/NavBar"
import UserProfile from "src/core/components/patient/UserProfile"

import Ordonnance from "src/core/components/patient/Ordonnance/ListOrdonnances"
import { Navbar, MobileNav, Typography, Button, IconButton, Card } from "@material-tailwind/react"

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

const OrdonnancePatient: BlitzPage = () => {
  var [currentUser, setCurrentUser] = useState<any>(null)
  useEffect(() => {
    console.log("navbar", currentUser)
  }, [currentUser])

  return (
    <div>
      <NavBar setCurrentUser={setCurrentUser} />
      <div>
        <div className="flex flex-col items-center  h-screen">
          <div>
            <Typography className="text-[#172048] text-3xl mb-5 font-bold ml-3 mt-5">
              Mes ordonnances
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
            <div>
              <Suspense>
                <UserOrd />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdonnancePatient
