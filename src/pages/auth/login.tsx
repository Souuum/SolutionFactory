import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { LoginForm } from "src/auth/components/LoginForm"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Log In">
      <LoginForm
        onSuccess={(_user) =>
          _user.role.toLowerCase() == "pharmacist"
            ? router.push(Routes.HomePharmacist())
            : _user.role.toLowerCase() == "medecin"
            ? router.push(Routes.HomeMedecin())
            : _user.role.toLowerCase() == "patient"
            ? router.push(Routes.HomePatient())
            : console.log(_user.role.toLowerCase())
        }
      />
    </Layout>
  )
}

export default LoginPage
