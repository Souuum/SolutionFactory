import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import { SignupForm } from "src/auth/components/SignupForm"
import { BlitzPage, Routes, useParam } from "@blitzjs/next"
import React, { useState, useEffect } from "react"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  const [role, setRole] = useState<string | string[] | undefined>("role")

  const roleParam = useParam("role")
  useEffect(() => {
    setRole(roleParam)
  }, [roleParam])

  return (
    <Layout title="Sign Up">
      <SignupForm role={role} />
    </Layout>
  )
}
export default SignupPage
