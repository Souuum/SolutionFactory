import React from "react"
import { useMutation } from "@blitzjs/rpc"
import { IMPORT_USER_ADMIN } from "../../graphql/dist/user"
import WithNotification from "../notifications/WithNotification"
import download from "../../assets/download.png"
import upload from "../../assets/upload-cloud.png"
import deleteFile from "../../assets/delete-file.png"
import checkFile from "../../assets/check-file.png"
import cloud from "../../assets/clound-sync-blue.png"

const ImportAdmin = (props) => {
  React.useEffect(() => {
    if (props.openModal) {
      clickImport()
      props.resetModal()
    }
  }, [props.openModal])
  const file = React.createRef()
  const modalRef = React.createRef()
  const [importResult, setImportResult] = React.useState(null)
  const [uploadFile, setuploadFile] = React.useState(null)
  const [statusResult, setStatutResult] = React.useState(null)
  const [ImportUserAdmin] = useMutation(IMPORT_USER_ADMIN)

  const clickImport = () => {
    setuploadFile(null)
    setImportResult(null)
    setStatutResult(null)
    const element = modalRef.current
    $(element).modal("show")
    $(element).on("hidden.bs.modal", modalClose)
  }

  const modalClose = () => {
    const element = modalRef.current
    $(element).modal("hide")
  }

  const uploadFileAdded = () => {
    const name = file.current.files[0].name
    const lastDot = name.lastIndexOf(".")
    const ext = name.substring(lastDot + 1)

    if (ext !== "xlsx" && ext !== "xls") {
      props.newNotification({
        header: "Problème d'extension",
        content: "Le fichier pour importer votre liste doit être au format EXCEL.",
        success: true,
        time: new Date().getTime(),
        timer_active: true,
      })
    } else {
      setuploadFile(false)
      const document = {
        document: file.current.files[0],
        entreprise: props.entrepriseId,
      }

      ImportUserAdmin({ variables: { document } })
        .then(({ data }) => {
          setImportResult(data.ImportUserAdmin.error)
          setStatutResult(data.ImportUserAdmin.success)
          props.newNotification({
            header: data.ImportUserAdmin.titre,
            content: data.ImportUserAdmin.message,
            success: data.ImportUserAdmin.success,
            time: new Date().getTime(),
            timer_active: true,
          })
          file.current = null
          setuploadFile(true)
          props.reload()
        })
        .catch((e) => {
          props.newNotification({
            header: e.message.replace("GraphQL error:", ""),
            content: e.message.replace("GraphQL error:", ""),
            success: false,
            time: new Date().getTime(),
            timer_active: true,
          })
        })
    }
  }

  const uploadButton = () => {
    file.current.click()
  }

  const downloadRapport = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const element = document.createElement("a")
    const file = new Blob([importResult.join("\n")], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "rapport.txt"
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  return (
    <div className="modal fade modal-import" role="dialog" ref={modalRef}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Importation des collaborateurs</h5>
          </div>
          <div className="modal-body">
            {statusResult == null && uploadFile === null && (
              <React.Fragment>
                <p>
                  Besoin d'importer une liste importante d'apprenant,
                  <br /> remplissez notre fichier et importez-le :
                </p>
                <a href="/import_utilisateurs.xlsx" className="d-flex margin-import">
                  <div className="d-inline-flex">
                    <img src={download} alt="télécharger" />
                  </div>
                  <div className="d-inline-flex">
                    Vous souhaitez obtenir le fichier excel
                    <br /> nécessaire à la création de votre liste.
                  </div>
                </a>
                <div>
                  <form>
                    <input
                      type="file"
                      name="file"
                      ref={file}
                      onChange={() => uploadFileAdded()}
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />

                    <a href="#" className="d-flex margin-import" onClick={() => uploadButton()}>
                      <div className="d-inline-flex">
                        <img src={upload} alt="upload" />
                      </div>
                      <div className="d-inline-flex">
                        C'est bon ! Vous êtes prêt pour importer la liste
                        <br /> de vos apprenants.
                      </div>
                    </a>
                  </form>
                </div>
              </React.Fragment>
            )}
            {statusResult == null && uploadFile === false && (
              <React.Fragment>
                <div className="container">
                  <div className="row">
                    <div className="col-12 d-flex margin-import">
                      <div className="d-inline-flex">
                        <img src={cloud} alt="Téléchargement en cours" />
                      </div>
                      <div className="d-inline-flex align-self-center">Téléchargement en cours</div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
            {statusResult !== null && (
              <React.Fragment>
                {statusResult ? (
                  <div className="container">
                    <div className="row">
                      <div className="col-12 d-flex margin-import">
                        <div className="d-inline-flex">
                          <img src={checkFile} alt="Check file" />
                        </div>
                        <div className="d-inline-flex align-self-center">
                          Importation réalisée avec succés.
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <React.Fragment>
                    <p>L'importation de vos données comporte des erreurs.</p>
                    <a onClick={(e) => downloadRapport(e)} className="d-flex margin-import">
                      <div className="d-inline-flex">
                        <img src={deleteFile} alt="Delete file" />
                      </div>
                      <div className="d-inline-flex lh-50">Rapport d'import</div>
                    </a>
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-light" onClick={modalClose}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WithNotification(ImportAdmin)
