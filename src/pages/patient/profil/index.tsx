import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"

import NavBar from "src/core/components/NavBar"
import UserProfile from "src/core/components/UserProfile"
import { Navbar, MobileNav, Typography, Button, IconButton, Card } from "@material-tailwind/react"
import { User } from "@prisma/client"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

type UserInfoProps = {
  setCurrentUser: (user: any) => void
  currentUser: any
}
const UserInfo = ({ currentUser, setCurrentUser }: UserInfoProps) => {
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return <UserProfile currentUser={currentUser} setCurrentUser={setCurrentUser} />
  } else {
    return (
      <>
        <Typography></Typography>

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

const ProfilPatient: BlitzPage = () => {
  var [currentUser, setCurrentUser] = useState<any>(null)

  return (
    <div>
      <NavBar setCurrentUser={setCurrentUser} />
      <div>
        <UserInfo currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </div>
    </div>
  )
}

export default ProfilPatient
