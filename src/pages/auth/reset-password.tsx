import Layout from "src/core/layouts/Layout"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { ResetPassword } from "src/auth/schemas"
import resetPassword from "src/auth/mutations/resetPassword"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { assert } from "blitz"
import NavBar from "../../core/components/NavBar"
import Navbar from "../../core/components/NavBar"
import React from "react"

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter()
  const token = router.query.token?.toString()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <div className="h-screen bg-sky-100">
      <div className="items-center justify-center">
        <div className="flex items-center justify-center">
          <Navbar />
        </div>
        <div className="my-48">
          <h1 className="text-center text-4xl my-6">Set a New Password</h1>
          <div className="flex items-center justify-center">
            {isSuccess ? (
              <div>
                <h2>Password Reset Successfully</h2>
                <p>
                  Go to the <Link href={Routes.Home()}>homepage</Link>
                </p>
              </div>
            ) : (
              <Form
                submitText="Reset Password"
                schema={ResetPassword}
                initialValues={{
                  password: "",
                  passwordConfirmation: "",
                  token,
                }}
                onSubmit={async (values) => {
                  try {
                    assert(token, "token is required.")
                    await resetPasswordMutation({ ...values, token })
                  } catch (error: any) {
                    if (error.name === "ResetPasswordError") {
                      return {
                        [FORM_ERROR]: error.message,
                      }
                    } else {
                      return {
                        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                      }
                    }
                  }
                }}
              >
                <div className="items-center justify-center">
                  <LabeledTextField
                    className="w-96 text-base py-1 px-2 rounded border-b border-b-cyan-700 bg-sky-100 w-1/2 border-solid appearance-none mt-2"
                    name="password"
                    label="Nouveau Mot de Passe"
                    type="password"
                  />
                  <LabeledTextField
                    className="w-96 text-base py-1 px-2 rounded border-b border-b-cyan-700 bg-sky-100 w-1/2 border-solid appearance-none mt-2"
                    name="passwordConfirmation"
                    label="Confirmation du Mot de Passe"
                    type="password"
                  />
                </div>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"
ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
