import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import login from "src/auth/mutations/login"
import { Login } from "src/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { set } from "zod"
import NavBar from "../../core/components/NavBar"
import Navbar from "../../core/components/NavBar"
import React from "react"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  return (
    <div className="h-screen bg-sky-100">
      <div className="flex items-center justify-center">
        <Navbar />
      </div>
      <div className="flex items-center justify-center">
        <div className="w-1/2 text-center p-4 mx-auto">
          <h1 className="text-5xl my-3.5">Connexion</h1>
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
                      "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                  }
                }
              }
            }}
          >
            <div className="flex flex-col items-center">
              <LabeledTextField
                className="w-96 text-base py-1 px-2 rounded border-b border-b-cyan-700 bg-sky-100 w-1/2 border-solid appearance-none mt-2"
                name="email"
                label="Email"
                placeholder="Email"
              />
              <LabeledTextField
                className="w-96 text-base py-1 px-2 rounded border-b border-b-cyan-700 bg-sky-100 w-1/2 border-solid appearance-none mt-2"
                name="password"
                label="Password"
                placeholder="Mot de passe"
                type="password"
              />
              <div>
                <Link href={Routes.ForgotPasswordPage()}>Mot de passe oublié ?</Link>
              </div>
            </div>
          </Form>
        </div>
        <div className="w-1/2 text-center">
          <h1 className="text-5xl my-3.5"> Pas encore inscrit ? </h1>
          <Link className="text-xl" href={Routes.SignupPage({ role: "patient" })}>
            <button className="rounded p-2 bg-cyan-600 my-2 w-80">Inscription</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
