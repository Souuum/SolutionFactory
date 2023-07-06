import { useMutation, useQuery } from "@blitzjs/rpc"
import { Typography } from "@material-tailwind/react"
import { Suspense, useEffect, useState } from "react"
import getGroupeByPatient from "src/groupe/queries/getGroupeByPatient"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import "swiper/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPerson,
  faPersonDress,
  faPlus,
  faTimes,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons"
import { set } from "zod"
import { Form, FORM_ERROR } from "src/core/components/Form"
import LabeledTextField from "../LabeledTextField"
import { ForgotPassword } from "src/auth/schemas"
import createUser from "src/auth/mutations/createUser"

type GroupeComponentProps = {
  getCurrentUser: (user: any) => void
  currentUser: any
}

const GroupeComponents = ({ getCurrentUser, currentUser }: GroupeComponentProps) => {
  const [showPopup, setShowPopup] = useState(false)
  const [groupeList, setGroupeList] = useState<any>([])
  const [groupe] = useQuery(getGroupeByPatient, null)
  const [createUserMutation, { isSuccess }] = useMutation(createUser)
  useEffect(() => {
    if (groupe) {
      setGroupeList(groupe.patients?.groupe.patients)
      console.log("groupe", groupe)
    } else console.log("no groupe")
  }, [groupe])

  const handlePrescriptionClick = (groupe) => {
    //supprimer la prescription de la liste
    console.log("Prescription clicked:", groupe)
  }

  const handleAddMemberClick = () => {
    console.log("Add member clicked")
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={10}
        style={{ width: "100%" }}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {groupeList.map((patient) => (
          <div key={patient.id}>
            <ul>
              <SwiperSlide key={patient.id}>
                <div
                  style={{
                    border: "1px solid #B2D8FF",
                    borderRadius: "8px",
                    padding: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "170px", // Taille ajustée en fonction du contenu
                  }}
                  onClick={() => handlePrescriptionClick(patient)}
                >
                  <FontAwesomeIcon
                    icon={patient.user.gender === "MAN" ? faPerson : faPersonDress}
                    style={{ color: "#000", fontSize: "24px", marginBottom: "10px" }}
                  />
                  <div style={{ textAlign: "center" }}>
                    {patient.user.firstName} {patient.user.lastName}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {patient.user.birthDate.toLocaleDateString()}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    {patient.user.gender === "MAN" ? "Homme" : "Femme"}
                  </div>
                  {patient.user?.id == currentUser?.id ? null : (
                    <FontAwesomeIcon
                      icon={faUserSlash}
                      style={{ color: "#000000", fontSize: "20px" }}
                    />
                  )}
                </div>
              </SwiperSlide>
            </ul>
          </div>
        ))}
        <SwiperSlide>
          <div
            style={{
              border: "1px solid #B2D8FF",
              borderRadius: "8px",
              padding: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "170px",
              width: "150px",
              margin: "0 20px" /* Ajustez la marge selon vos besoins */,
            }}
            onClick={() => handleAddMemberClick()}
          >
            <p style={{ margin: 0, marginBottom: "10px", textAlign: "center" }}>
              Ajouter un membre
            </p>
            <button style={{ border: "none", background: "none" }}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </SwiperSlide>
      </Swiper>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "20px",
              width: "300px",
              position: "relative", // Add position relative to create a new stacking context
            }}
          >
            <FontAwesomeIcon
              icon={faTimes}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
              }}
              onClick={handleClosePopup}
            />
            {isSuccess ? (
              <div>
                <h2>Request Submitted</h2>
                <p>
                  If your email is in our system, you will receive instructions to reset your
                  password shortly.
                </p>
              </div>
            ) : (
              <div>
                <Form
                  submitText="Confirmer"
                  schema={ForgotPassword}
                  initialValues={{ email: "" }}
                  onSubmit={async (values) => {
                    values = { ...values, groupe: parseInt(groupe.patients?.groupeId as any) }
                    try {
                      await createUserMutation(values)
                    } catch (error: any) {
                      return {
                        [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again.",
                      }
                    }
                  }}
                >
                  <Typography className="text-[#172048] text-xl mb-5 font-bold ">
                    Ajouter un membre
                  </Typography>
                  <LabeledTextField
                    className="w-3/4 text-base py-1 px-2 rounded border-b border-b-cyan-700 bg-sky-100 w-1/2 border-solid appearance-none mt-2"
                    name="email"
                    label="Email"
                    placeholder="Email"
                  />
                </Form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

type GroupeProps = {
  setCurrentUser: (user: any) => void
  currentUser: any
}

const MonGroupe = ({ setCurrentUser, currentUser }: GroupeProps) => {
  return (
    <div>
      <Typography className="text-[#172048] text-3xl mb-5 font-bold mb-10">Mon groupe</Typography>
      <Suspense fallback="Loading...">
        <GroupeComponents currentUser={currentUser} getCurrentUser={setCurrentUser} />
      </Suspense>
    </div>
  )
}

export default MonGroupe
