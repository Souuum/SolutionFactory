import { Suspense } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"

import NavBar from "src/core/components/NavBar"
import { Navbar, MobileNav, Typography, Button, IconButton, Card } from "@material-tailwind/react"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return <></>
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

const ProfilPharmacien: BlitzPage = () => {
  return (
    <div>
      <Suspense>
        <NavBar />
      </Suspense>
      <div>
        <Suspense>
          <UserProfile />
        </Suspense>
      </div>
    </div>
  )
}

export default ProfilPharmacien
