import Layout from "src/core/layouts/Layout"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { ForgotPassword } from "src/auth/schemas"
import forgotPassword from "src/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import Navbar from "../../core/components/NavBar"
import React, { useEffect, useState } from "react"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)
  var [currentUser, setCurrentUser] = useState<any>(null)
  useEffect(() => {
    console.log("navbar", currentUser)
  }, [currentUser])

  return (
    <div className="bg-blue-300 items-center justify-center">
      <Navbar setCurrentUser={setCurrentUser} />
      <div className="flex items-center h-screen">
        <div className="mx-auto justify-center">
          {isSuccess ? (
            <>
              <h1 className="text-center text-4xl">Email envoyé</h1>
              <Layout title="Forgot Your Password?">
                <div className="items-center justify-center my-6">
                  <p className="text-center">
                    Si votre email est dans notre base de données, vous allez recevoir un mail qui
                    vous indiquera les étapes
                    <br /> à suivre pour modifier votre mot de passe.
                  </p>
                </div>
              </Layout>
            </>
          ) : (
            <>
              <h1 className="text-center text-4xl">Mot de passe oublié</h1>
              <Layout title="Forgot Your Password?">
                <Form
                  submitText="Valider"
                  schema={ForgotPassword}
                  initialValues={{ email: "" }}
                  onSubmit={async (values) => {
                    try {
                      await forgotPasswordMutation(values)
                    } catch (error: any) {
                      return {
                        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                      }
                    }
                  }}
                >
                  <div className="flex justify-center">
                    <LabeledTextField
                      className="w-[20rem] sm:w-96 text-base py-1 px-2 rounded bg-sky-100 appearance-none mt-2"
                      name="email"
                      label="Email"
                      placeholder="Email"
                    />
                  </div>
                </Form>
              </Layout>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
