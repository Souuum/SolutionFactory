import { useQuery, useMutation } from "@blitzjs/rpc"
import { Typography } from "@material-tailwind/react"
import { Suspense, useEffect, useState } from "react"
import getActualPrescriptionsByOrdonnances from "src/prescription/queries/getActualPrescriptionsByOrdonnances"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper"
import "swiper/css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPills, faCheck } from "@fortawesome/free-solid-svg-icons"
import updatePresciptionsWhenMidday from "src/prescription/mutations/updatePresciptionsWhenMidday"
import updatePresciptionsWhenMorning from "src/prescription/mutations/updatePresciptionsWhenMorning"
import updatePresciptionsWhenEvening from "src/prescription/mutations/updatePresciptionsWhenEvening"
import updatePresciptionsMorning from "src/prescription/mutations/updatePresciptionsMorning"
import updatePresciptionsMidday from "src/prescription/mutations/updatePrescriptionsMidday"
import updatePresciptionsEvening from "src/prescription/mutations/updatePrescriptionsEvening"

type PrescriptionComponentProps = {
  getCurrentUser: (user: any) => void
  currentUser: any
}

const PrescriptionsComponents = ({ getCurrentUser, currentUser }: PrescriptionComponentProps) => {
  const [ordonnancesList, setOrdonnancesList] = useState<any>([])
  const [ordonnances] = useQuery(getActualPrescriptionsByOrdonnances, null)
  const currentTime = new Date()
  const currentHour = currentTime.getHours()
  const [updatePresciptionsWhenMiddayMutation] = useMutation(updatePresciptionsWhenMidday)
  const [updatePresciptionsWhenMorningMutation] = useMutation(updatePresciptionsWhenMorning)
  const [updatePresciptionsWhenEveningMutation] = useMutation(updatePresciptionsWhenEvening)
  const [updatePresciptionsMorningMutation] = useMutation(updatePresciptionsMorning)
  const [updatePresciptionsMiddayMutation] = useMutation(updatePresciptionsMidday)
  const [updatePresciptionsEveningMutation] = useMutation(updatePresciptionsEvening)

  useEffect(() => {
    const updatePrescriptions = async () => {
      try {
        if (currentHour >= 6 && currentHour < 10) {
          await updatePresciptionsWhenMorningMutation().catch((error) => {
            console.error("Error updating prescriptions in the morning:", error)
          })
        } else if (currentHour >= 12 && currentHour < 15) {
          await updatePresciptionsWhenMiddayMutation().catch((error) => {
            console.error("Error updating prescriptions at midday:", error)
          })
        } else if (currentHour >= 18 && currentHour < 24) {
          await updatePresciptionsWhenEveningMutation().catch((error) => {
            console.error("Error updating prescriptions in the evening:", error)
          })
        }

        if (ordonnances) {
          setOrdonnancesList(ordonnances)
          console.log("prescription", ordonnances)
        } else {
          console.log("no prescription")
        }
      } catch (error) {
        console.log("An error occurred:", error)
      }
    }

    updatePrescriptions().catch((error) => {
      console.error("Error updating prescriptions:", error)
    })
  }, [
    ordonnances,
    currentHour,
    updatePresciptionsWhenMorningMutation,
    updatePresciptionsWhenMiddayMutation,
    updatePresciptionsWhenEveningMutation,
  ])

  const handlePrescriptionClick = async (prescription) => {
    if (currentHour >= 6 && currentHour < 10) {
      await updatePresciptionsMorningMutation({ id: prescription.id })
    } else if (currentHour >= 12 && currentHour < 15) {
      await updatePresciptionsMiddayMutation({ id: prescription.id })
    } else if (currentHour >= 18 && currentHour < 24) {
      const evening = await updatePresciptionsEveningMutation({ id: prescription.id })
    }
    // Supprimer la prescription de la liste
    setOrdonnancesList((ordonnancesList) => {
      const newOrdonnancesList = ordonnancesList.map((ordonnance) => {
        if (ordonnance.id === prescription.ordonnanceId) {
          const newPrescriptions = ordonnance.prescriptions.filter(
            (prescriptionItem) => prescriptionItem.id !== prescription.id
          )
          return { ...ordonnance, prescriptions: newPrescriptions }
        } else {
          return ordonnance
        }
      })
      return newOrdonnancesList
    })

    console.log("Prescription clicked:", prescription)
  }

  const filterPrescriptions = (prescriptions) => {
    // Filter prescriptions based on current time, hasTaken, and the time of day
    const filteredPrescriptions = prescriptions.filter((prescription) => {
      const expirationTime = new Date(prescription.expirationTime).getTime()
      const hasTaken =
        prescription.hasTakenMorning ||
        prescription.hasTakenAfternoon ||
        prescription.hasTakenEvening

      // Check if the prescription is still valid (expirationTime greater than current time)
      // and if hasTaken is false
      if (expirationTime > currentTime && !hasTaken) {
        // Check the time of day (morning, afternoon, evening)
        const currentHour = new Date().getHours()

        if (
          (prescription.morning > 0 && currentHour >= 6 && currentHour < 10) ||
          (prescription.afternoon > 0 && currentHour >= 12 && currentHour < 15) ||
          (prescription.evening > 0 && currentHour >= 18 && currentHour < 24)
        ) {
          return true
        }
      }

      return false
    })
    console.log("filteredPrescriptions", filteredPrescriptions)
    return filteredPrescriptions
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
      <div>
        {ordonnancesList?.map((ordonnance) => (
          <div key={ordonnance.id}>
            <ul>
              {filterPrescriptions(ordonnance.prescriptions)?.map((prescription) => (
                <SwiperSlide key={prescription.id}>
                  <div
                    style={{
                      border: "1px solid #B2D8FF", // Use a light blue color of your choice
                      borderRadius: "8px",
                      padding: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "130px", // Adjust the height as needed
                      width: "115px", // Adjust the width as needed
                    }}
                    onClick={() => handlePrescriptionClick(prescription)}
                  >
                    <FontAwesomeIcon
                      icon={faPills}
                      style={{ color: "#000", fontSize: "24px", marginBottom: "10px" }}
                    />
                    <div style={{ textAlign: "center" }}>{prescription.drug}</div>
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ color: "#00FF00", fontSize: "24px" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Swiper>
  )
}

type PrescriptionProps = {
  setCurrentUser: (user: any) => void
  currentUser: any
}

const MesPrescriptions = ({ setCurrentUser, currentUser }: PrescriptionProps) => {
  const currentTime = new Date()
  const currentHour = currentTime.getHours()

  let prescriptionText = "Mes prescriptions à prendre"
  console.log("currentHour", currentHour)
  if (currentHour >= 6 && currentHour < 10) {
    prescriptionText += " ce matin"
  } else if (currentHour >= 12 && currentHour < 15) {
    prescriptionText += " ce midi"
  } else if (currentHour >= 18 && currentHour < 24) {
    prescriptionText += " ce soir"
  }
  return (
    <div>
      <Typography className="text-[#172048] text-3xl mb-5 font-bold mb-10">
        {prescriptionText}
      </Typography>
      <Suspense fallback="Loading...">
        <PrescriptionsComponents currentUser={currentUser} getCurrentUser={setCurrentUser} />
      </Suspense>
    </div>
  )
}

export default MesPrescriptions
