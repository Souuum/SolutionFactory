import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import login from "src/auth/mutations/login"
import { Login } from "src/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import NavBar from "../../core/components/NavBar"
import Navbar from "../../core/components/NavBar"
import React, { useEffect, useState } from "react"
import { Suspense } from "react"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  var [currentUser, setCurrentUser] = useState<any>(null)
  useEffect(() => {
    console.log("navbar", currentUser)
  }, [currentUser])

  return (
    <>
      <Suspense>
        <Navbar setCurrentUser={setCurrentUser} />
      </Suspense>
      <div className="h-screen bg-blue-300 flex justify-center">
        <div className="flex flex-col items-center justify-center sm:flex-row">
          <div className="w-full sm:w-1/2 text-center p-4 mx-auto">
            <h1 className="text-3xl sm:text-5xl my-3.5">Connexion</h1>
            <Form
              submitText="Connexion"
              schema={Login}
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                try {
                  const user = await loginMutation(values)
                  props.onSuccess?.(user)
                } catch (error: any) {
                  if (error instanceof AuthenticationError) {
                    return {
                      [FORM_ERROR]: "Votre identifiant et/ou votre mot de passe est incorrect.",
                    }
                  } else {
                    return {
                      [FORM_ERROR]:
                        "Sorry, we had an unexpected error. Please try again. - " +
                        error.toString(),
                    }
                  }
                }
              }}
            >
              <div className="flex flex-col items-center">
                <LabeledTextField
                  className="w-96 sm:w-full text-lg py-2 px-3 rounded appearance-none mt-2"
                  name="email"
                  label="Email"
                  placeholder="Email"
                />
                <LabeledTextField
                  className="w-96 sm:w-full text-lg py-2 px-3 rounded appearance-none mt-2"
                  name="password"
                  label="Mot de passe"
                  placeholder="Mot de passe"
                  type="password"
                />
                <div>
                  <Link href={Routes.ForgotPasswordPage()}>Mot de passe oublié ?</Link>
                </div>
              </div>
            </Form>
          </div>
          <div className="w-full sm:w-1/2 text-center p-4 mx-auto">
            <h1 className="text-3xl sm:text-5xl my-3.5"> Pas encore inscrit ? </h1>
            <Link href={Routes.SignupPage({ role: "patient" })}>
              <button className="rounded p-2 bg-cyan-600 my-2 w-80">Inscription</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm
