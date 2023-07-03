import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage, useParam } from "@blitzjs/next"
import CloseIcon from "@mui/icons-material/Close"
import NavBar from "src/core/components/NavBar"
import UserProfile from "src/core/components/patient/UserProfile"
import UploadIcon from "@mui/icons-material/Upload"
import DownloadIcon from "@mui/icons-material/Download"
import Ordonnance from "src/core/components/Ordonnance"
import { Navbar, MobileNav, Typography, Button, IconButton, Card } from "@material-tailwind/react"
import { useRouter } from "next/router"
import getOrdonnanceById from "src/ordonnances/queries/getOrdonnanceById"
import OrdonnanceDetails from "src/ordonnances/components/OrdonnanceDetails"
import createTokenOrdonnance from "src/tokenOrdonnance/mutations/createTokenOrdonnance"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserOrd = () => {
  const router = useRouter()
  const [id, setRole] = useState<string | string[] | undefined>("id")
  const idParam = useParam("id")
  const [ordonnance, { refetch }] = useQuery(getOrdonnanceById, parseInt(idParam as string))
  const [showPopup, setShowPopup] = useState(false)
  const [token, setToken] = useState("")
  const [createTokenOrdonnanceMutation, { isSuccess }] = useMutation(createTokenOrdonnance)

  const generateToken = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let token = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      token += characters.charAt(randomIndex)
    }
    return token
  }

  useEffect(() => {
    setRole(idParam)
    console.log("id", idParam)
    console.log("ordonnance", ordonnance)
  }, [idParam])

  const handleUploadClick = (event) => {
    setShowPopup(true)
    const token = generateToken(5)
    setToken(token)
    console.log("Clic sur l'icône d'impression :", ordonnance)
  }

  const handleDownloadClick = (ordonnance, event) => {
    console.log("Clic sur l'icône de téléchargement :", ordonnance)
  }

  const handleCloseClick = () => {
    setShowPopup(false)
    setToken("")
  }

  const handleExportClick = async () => {
    try {
      console.log("Exporting token:", token)
      await createTokenOrdonnanceMutation({
        token: token,
        idOrdonnance: parseInt(idParam as string),
      })
      // Logique d'exportation du token ici
    } catch (error) {
      // Gestion des erreurs ici
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex justify-end">
        <div className="flex-none w-[75px] mx-10">
          <UploadIcon
            onClick={(event) => handleUploadClick(ordonnance, event)}
            className="text-[#188CA5] mr-4 w-10 h-10"
          />
        </div>
        <div className="flex-none w-[75px]">
          <DownloadIcon
            onClick={(event) => handleDownloadClick(ordonnance, event)}
            className="text-[#188CA5] mr-4 w-10 h-10"
          />
        </div>
      </div>
      <Typography className="text-[#172048] text-xl mb-5 font-bold ml-3 mt-5">
        Médecin: Dr. {ordonnance?.medecin?.user.lastName}
      </Typography>
      <Typography className="text-[#172048] text-xl mb-5 font-bold ml-3 mt-5">
        Cabinet: Dr. {ordonnance?.medecin?.cabinet}
      </Typography>
      <Typography className="text-[#172048] text-xl mb-5 font-bold ml-3 mt-5">
        Date de prescription: {ordonnance?.createdAt.toLocaleDateString("fr-FR")}
      </Typography>
      <Typography className="text-[#172048] text-xl mb-5 font-bold ml-3 mt-5">
        Date d'expiration: {ordonnance?.expiration.toLocaleDateString("fr-FR")}
      </Typography>
      <OrdonnanceDetails ordonnance={ordonnance} />
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-64 rounded p-4 relative">
            <button className="text-gray-500 absolute top-2 right-2" onClick={handleCloseClick}>
              <CloseIcon className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold mb-4">Le code de votre ordonnance:</h3>
            <p className="text-3xl font-bold mb-4">{token}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleExportClick}
            >
              Valider
            </button>
          </div>
        </div>
      )}
    </>
  )
}

const OrdonnancePatient: BlitzPage = () => {
  var [currentUser, setCurrentUser] = useState<any>(null)
  useEffect(() => {
    console.log("navbar", currentUser)
  }, [currentUser])

  return (
    <div>
      <NavBar setCurrentUser={setCurrentUser} />
      <div>
        <div className="flex flex-col items-center  h-screen">
          <div>
            <Typography className="text-[#172048] text-3xl mb-5 font-bold ml-3 mt-5">
              Mon ordonnance
            </Typography>
            <div>
              <Suspense>
                <UserOrd />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdonnancePatient
