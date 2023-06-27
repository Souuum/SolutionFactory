import Layout from "src/core/layouts/Layout"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { ForgotPassword } from "src/auth/schemas"
import forgotPassword from "src/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import Navbar from "../../core/components/NavBar"
import React from "react"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <div className="h-screen bg-sky-100">
      <div className="items-center justify-center">
        <div className="flex items-center justify-center">
          <Navbar />
        </div>
        <div className="my-48">
          <div className="items-center justify-center">
            <h1 className="text-center text-4xl">Forgot your password?</h1>
            <div className=" flex items-center justify-center">
              <Layout title="Forgot Your Password?">
                {isSuccess ? (
                  <div>
                    <h2>Request Submitted</h2>
                    <p>
                      If your email is in our system, you will receive instructions to reset your
                      password shortly.
                    </p>
                  </div>
                ) : (
                  <Form
                    submitText="Send Reset Password Instructions"
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
                    <LabeledTextField
                      className="w-96 text-base py-1 px-2 rounded border-b border-b-cyan-700 bg-sky-100 w-1/2 border-solid appearance-none mt-2"
                      name="email"
                      label="Email"
                      placeholder="Email"
                    />
                  </Form>
                )}
              </Layout>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
