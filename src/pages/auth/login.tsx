import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { LoginForm } from "src/auth/components/LoginForm"
import { useRouter } from "next/router"
import React, { useState, useEffect, Suspense } from "react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Log In">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm
          onSuccess={(_user) =>
            _user.role.toLowerCase() == "pharmacist"
              ? router.push(Routes.HomePharmacist())
              : _user.role.toLowerCase() == "medecin"
              ? router.push(Routes.ProfilDoc())
              : _user.role.toLowerCase() == "patient" || _user.role.toLowerCase() == "superpatient"
              ? router.push(Routes.HomePatient())
              : console.log(_user.role.toLowerCase())
          }
        />
      </Suspense>
    </Layout>
  )
}

export default LoginPage
