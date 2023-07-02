import { useQuery } from "@blitzjs/rpc"
import { Typography } from "@material-tailwind/react"
import { Suspense, useEffect, useState } from "react"
import getActualOrdonnances from "src/ordonnances/queries/getActualOrdonances"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import "swiper/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaste, faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons"
import { set } from "zod"
import { Routes } from "@blitzjs/next"
import Link from "next/link"

type OrdonnancesComponentProps = {
  getCurrentUser: (user: any) => void
  currentUser: any
}

const OrdonnancesComponents = ({ getCurrentUser, currentUser }: OrdonnancesComponentProps) => {
  const [ordonnancesList, setOrdonnancesList] = useState<any>([])
  const [ordonnances] = useQuery(getActualOrdonnances, null)
  useEffect(() => {
    if (ordonnances) {
      setOrdonnancesList(ordonnances)
      console.log("ordonnance", ordonnances)
    } else console.log("no prescription")
  }, [ordonnances])

  const handlePrescriptionClick = (ordonnance) => {
    console.log("Ordonnance clicked:", ordonnance)
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
          <SwiperSlide key={ordonnance.id}>
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
              onClick={() => handlePrescriptionClick(ordonnance)}
            >
              <FontAwesomeIcon
                icon={faPaste}
                style={{ color: "#000", fontSize: "24px", marginBottom: "10px" }}
              />
              <div style={{ textAlign: "center" }}>
                {ordonnance.createdAt.toLocaleDateString("fr-FR")}
              </div>
              <div style={{ textAlign: "center" }}>{ordonnance.medecin.user.lastName}</div>
              <Link
                href={Routes.OrdonnancePatient({
                  id: ordonnance.id,
                })}
                className="inline-flex items-center hover:underline"
              >
                <span className="ml-1">
                  <FontAwesomeIcon icon={faEye} style={{ color: "black", fontSize: "24px" }} />
                </span>
              </Link>
            </div>
          </SwiperSlide>
        </div>
      ))}
    </Swiper>
  )
}
type OrdonnancesProps = {
  setCurrentUser: (user: any) => void
  currentUser: any
}

const MesOrdonnances = ({ setCurrentUser, currentUser }: OrdonnancesProps) => {
  return (
    <div>
      <Typography className="text-[#172048] text-3xl mb-5 font-bold mb-10">
        Mes ordonnances en cours
      </Typography>
      <Typography className="text-[#172048] text-xl mb-5 font-bold mb-10">
        <Link href={Routes.Ordonnances()} className="inline-flex items-center hover:underline">
          Voir toutes mes ordonnances
          <span className="ml-1">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </Link>
      </Typography>
      <Suspense fallback="Loading...">
        <OrdonnancesComponents currentUser={currentUser} getCurrentUser={setCurrentUser} />
      </Suspense>
    </div>
  )
}

export default MesOrdonnances
