import { AuthenticationError, PromiseReturnType } from "blitz"
import Link from "next/link"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import login from "src/auth/mutations/login"
import { Login } from "src/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { set } from "zod"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  return (
    <div className="h-screen bg-sky-100 flex items-center justify-center">
      <div className="w-1/2 text-center p-4 mx-auto">
        <h1 className="text-5xl my-3.5">Connexion</h1>
        <Form
          submitText="Login"
          schema={Login}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              const user = await loginMutation(values)
              props.onSuccess?.(user)
            } catch (error: any) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
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
              placeholder="Password"
              type="password"
            />
            <div>
              <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>
            </div>
          </div>
        </Form>
      </div>
      <div className="w-1/2 text-center">
        <h1 className="text-5xl my-3.5"> Pas encore inscrit ? </h1>
        <button className="rounded p-2 bg-cyan-600 my-2 w-80">
          <Link className="text-xl" href={Routes.SignupPage({ role: "patient" })}>
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  )
}

export default LoginForm
