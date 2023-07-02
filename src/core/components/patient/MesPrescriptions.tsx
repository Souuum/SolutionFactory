import { useQuery } from "@blitzjs/rpc"
import { Typography } from "@material-tailwind/react"
import { Suspense, useEffect, useState } from "react"
import getActualPrescriptionsByOrdonnances from "src/prescription/queries/getActualPrescriptionsByOrdonnances"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import "swiper/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPills, faCheck } from "@fortawesome/free-solid-svg-icons"
import { set } from "zod"

type PrescriptionComponentProps = {
  getCurrentUser: (user: any) => void
  currentUser: any
}

const PrescriptionsComponents = ({ getCurrentUser, currentUser }: PrescriptionComponentProps) => {
  const [ordonnancesList, setOrdonnancesList] = useState<any>([])
  const [ordonnances] = useQuery(getActualPrescriptionsByOrdonnances, null)
  useEffect(() => {
    if (ordonnances) {
      setOrdonnancesList(ordonnances)
      console.log("prescription", ordonnances)
    } else console.log("no prescription")
  }, [ordonnances])

  const handlePrescriptionClick = (prescription) => {
    //supprimer la prescription de la liste
    setOrdonnancesList((ordonnancesList) => {
      const newOrdonnancesList = ordonnancesList.map((ordonnance) => {
        if (ordonnance.id === prescription.ordonnanceId) {
          const newPrescriptions = ordonnance.prescriptions.filter(
            (prescriptionItem) => prescriptionItem.id !== prescription.id
          )
          return { ...ordonnance, prescriptions: newPrescriptions }
        } else return ordonnance
      })
      return newOrdonnancesList
    })
    console.log("Prescription clicked:", prescription)
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
      {ordonnancesList?.map((ordonnance) => (
        <div key={ordonnance.id}>
          <ul>
            {ordonnance.prescriptions?.map((prescription) => (
              <SwiperSlide key={prescription.id}>
                <div
                  style={{
                    border: "1px solid #B2D8FF", // Utilisez une couleur bleu clair de votre choix
                    borderRadius: "8px",
                    padding: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "130px", // Ajustez la hauteur selon vos besoins
                    width: "115px", // Ajustez la largeur selon vos besoins
                  }}
                  onClick={() => handlePrescriptionClick(prescription)}
                >
                  <FontAwesomeIcon
                    icon={faPills}
                    style={{ color: "#000", fontSize: "24px", marginBottom: "10px" }}
                  />
                  <div style={{ textAlign: "center" }}>{prescription.drug}</div>
                  <FontAwesomeIcon icon={faCheck} style={{ color: "#00FF00", fontSize: "24px" }} />
                </div>
              </SwiperSlide>
            ))}
          </ul>
        </div>
      ))}
    </Swiper>
  )
}

type PrescriptionProps = {
  setCurrentUser: (user: any) => void
  currentUser: any
}

const MesPrescriptions = ({ setCurrentUser, currentUser }: PrescriptionProps) => {
  return (
    <div>
      <Typography className="text-[#172048] text-3xl mb-5 font-bold mb-10">
        Mes prescriptions à prendre
      </Typography>
      <Suspense fallback="Loading...">
        <PrescriptionsComponents currentUser={currentUser} getCurrentUser={setCurrentUser} />
      </Suspense>
    </div>
  )
}

export default MesPrescriptions
