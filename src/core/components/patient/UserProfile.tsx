import { List, ListItem, Card, Typography } from "@material-tailwind/react"
import { Form, FORM_ERROR } from "src/core/components/Form"
import { LabeledTextField } from "src/core/components/LabeledTextField"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import updatePatient from "src/pages/patient/mutations/updateUser"
import React, { useState } from "react"
import PersonIcon from "@mui/icons-material/Person"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import MailIcon from "@mui/icons-material/Mail"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import Man4Icon from "@mui/icons-material/Man4"
import { loadBlitzRpcResolverFilesWithInternalMechanism, useMutation, useQuery } from "@blitzjs/rpc"

type UserProfileProps = {
  setCurrentUser: (user: any) => void
  currentUser: any
}

const UserProfile = ({ setCurrentUser, currentUser }: UserProfileProps) => {
  const [editing, setEditing] = useState(false)
  const [updatePatientMutation] = useMutation(updatePatient)
  const birthdate = currentUser.birthDate
  const year = birthdate.getFullYear()
  const month = String(birthdate.getMonth() + 1).padStart(2, "0")
  const day = String(birthdate.getDate()).padStart(2, "0")
  const formattedDate = `${day}-${month}-${year}`

  const handleSubmit = async (values) => {
    if (currentUser) {
      try {
        const updatedPatient = await updatePatientMutation({
          userId: currentUser.id,
          email: values.email,
          phone: values.phone,
          lastName: currentUser.lastName,
          firstName: currentUser.firstName,
          gender: currentUser.gender,
        })
        setCurrentUser((prevState) => ({
          ...prevState,
          ...values,
          currentUser: updatedPatient,
        }))

        setEditing(false)
      } catch (error) {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  if (!currentUser) {
    return null
  }

  return (
    <Card className="w-96 bg-transparent shadow-none mt-8 absolute ml-40 m5">
      <Typography className="text-[#172048] text-3xl mb-5 font-bold ">Mon compte</Typography>
      <List>
        <ListItem className="mb-4">
          <div className="flex items-center">
            <PersonIcon className="text-[#188CA5] mr-4 w-15 h-15" />
            <div>
              <Typography className="text-[#979797] ">Nom</Typography>
              <Typography className="text-[#188CA5] text-2xl mb-5">
                {currentUser?.lastName.toUpperCase()} {currentUser?.firstName}
              </Typography>
            </div>
          </div>
        </ListItem>
        <ListItem className="mb-4">
          <div className="flex items-center">
            <CalendarMonthIcon className="text-[#188CA5] mr-4 w-15 h-15" />
            <div>
              <Typography className="text-[#979797] ">Date de naissance</Typography>
              <Typography className="text-[#188CA5] text-2xl mb-5">{formattedDate}</Typography>
            </div>
          </div>
        </ListItem>

        <ListItem className="mb-1">
          <div className="flex items-center">
            <LocalHospitalIcon className="text-[#188CA5] mr-4 w-15 h-15" />
            <div>
              <Typography className="text-[#979797]">Numéro de sécurité sociale</Typography>
              <Typography className="text-[#188CA5] text-2xl mb-5 ">
                {currentUser.patients?.securityNumber}
              </Typography>
            </div>
          </div>
        </ListItem>
      </List>
      {editing ? (
        <Form
          initialValues={{
            phone: currentUser.phone,
            email: currentUser.email,
          }}
          onSubmit={handleSubmit}
          className="ml-2"
        >
          <div className="items-center justify-center">
            <div className="flex items-center">
              <LocalPhoneIcon className="text-[#188CA5] mr-4 w-15 h-15" />
              <div>
                <LabeledTextField
                  style={{ height: "32px" }}
                  className="text-[#188CA5] text-2xl mb-5 "
                  name="phone"
                  label={<label className="text-[#979797]">Numéro de téléphone</label>}
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center">
              <MailIcon className="text-[#188CA5] mr-4 mt-3 w-15 h-15" />
              <div>
                <LabeledTextField
                  style={{ height: "32px" }}
                  className="text-[#188CA5] text-2xl mb-5 "
                  name="email"
                  label={<label className="text-[#979797]">Email</label>}
                  type="email"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 ml-14">
            <button className="text-[#172048]" type="submit">
              Enregistrer
            </button>
            <button className="text-[#172048]" onClick={() => setEditing(false)}>
              Annuler
            </button>
          </div>
        </Form>
      ) : (
        <List>
          <ListItem className="mb-4">
            <div className="flex items-center">
              <LocalPhoneIcon className="text-[#188CA5] mr-4 w-15 h-15" />
              <div>
                <Typography className="text-[#979797] ">Numéro de téléphone</Typography>
                <Typography className="text-[#188CA5] text-2xl mb-5 ">
                  {currentUser?.phone}
                </Typography>
              </div>
            </div>
          </ListItem>
          <ListItem>
            <div className="flex items-center">
              <MailIcon className="text-[#188CA5] mr-4 w-15 h-15" />
              <div>
                <Typography className="text-[#979797]  ">Email</Typography>
                <Typography className="text-[#188CA5] text-2xl mb-5  ">
                  {currentUser?.email}
                </Typography>
              </div>
            </div>
          </ListItem>

          <button className="text-[#172048]" onClick={() => setEditing(true)}>
            Modifier
          </button>
        </List>
      )}
    </Card>
  )
}

export default UserProfile
