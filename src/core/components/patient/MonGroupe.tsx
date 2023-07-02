import { useQuery } from "@blitzjs/rpc"
import { Typography } from "@material-tailwind/react"
import { Suspense, useEffect, useState } from "react"
import getGroupeByPatient from "src/groupe/queries/getGroupeByPatient"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import "swiper/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPerson, faPersonDress, faPlus, faUserSlash } from "@fortawesome/free-solid-svg-icons"
import { set } from "zod"

type GroupeComponentProps = {
  getCurrentUser: (user: any) => void
  currentUser: any
}

const GroupeComponents = ({ getCurrentUser, currentUser }: GroupeComponentProps) => {
  const [groupeList, setGroupeList] = useState<any>([])
  const [groupe] = useQuery(getGroupeByPatient, null)
  useEffect(() => {
    if (groupe) {
      setGroupeList(groupe.patients?.groupe.patients)
      console.log("groupe", groupe.patients?.groupe.patients)
    } else console.log("no groupe")
  }, [groupe])

  const handlePrescriptionClick = (groupe) => {
    //supprimer la prescription de la liste
    console.log("Prescription clicked:", groupe)
  }

  function addPatient(): void {
    console.log("add patient")
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={10}
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
                  border: "1px solid #B2D8FF", // Utilisez une couleur bleu clair de votre choix
                  borderRadius: "8px",
                  padding: "5px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "170px", // Ajustez la hauteur selon vos besoins
                  width: "150px", // Ajustez la largeur selon vos besoins
                }}
                onClick={() => handlePrescriptionClick(patient)}
              >
                <FontAwesomeIcon
                  icon={patient.user.gender === "male" ? faPerson : faPersonDress}
                  style={{ color: "#000", fontSize: "24px", marginBottom: "10px" }}
                />
                <div style={{ textAlign: "center" }}>
                  {patient.user.firstName} {patient.user.lastName}
                </div>
                <div style={{ textAlign: "center" }}>
                  {patient.user.birthDate.toLocaleDateString()}
                </div>
                <div style={{ textAlign: "center" }}>
                  {patient.user.gender === "male" ? "Homme" : "Femme"}
                </div>
                <div style={{ textAlign: "center" }}>{patient.user.email}</div>
                {patient.user.id == currentUser.id ? null : (
                  <FontAwesomeIcon
                    icon={faUserSlash}
                    style={{ color: "#000000", fontSize: "20px" }}
                  />
                )}
              </div>
            </SwiperSlide>
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
                onClick={() => addPatient()}
              >
                <p style={{ margin: 0, marginBottom: "10px", textAlign: "center" }}>
                  Ajouter un membre
                </p>
                <button style={{ border: "none", background: "none" }}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </SwiperSlide>
          </ul>
        </div>
      ))}
    </Swiper>
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
