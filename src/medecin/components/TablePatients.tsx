import { useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import Table from "src/core/components/table/Table"
import getMedecinPatients from "../queries/getMedecinPatients"
import { useState, useEffect } from "react"
import { useCurrentMedecin } from "../hooks/useCurrentMedecin"

const TablePatients = () => {
  const [keywords, setKeywords] = useState(null)
  const [items, setItems] = useState<any>()
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [currentOrder, setCurrentOrder] = useState<any>({ id: "asc" })
  const [page, setPage] = useState(0)
  const [selectList, setSelectList] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [loadingMulti, setLoadingMulti] = useState(true)

  if (keywords !== null && keywords !== undefined && keywords !== "") {
    queryOptions.where = {
      OR: [
        { id: parseInt(keywords) || undefined },
        { firstName: keywords },
        { lastName: keywords },
        { gender: keywords },
        { userId: parseInt(keywords) || undefined },
        // Ajoutez plus de conditions si nécessaire
      ],
    }
  }

  const medecin = useCurrentMedecin()
  console.log(medecin)
  const medecinId = medecin.id

  const queryOptions: any = {
    medecinId: medecinId,
    orderBy: currentOrder,
    skip: itemsPerPage * page,
    take: itemsPerPage,
  }
  const [{ patients, count }, { refetch }] = usePaginatedQuery(getMedecinPatients, queryOptions)

  useEffect(() => {
    console.log(patients)
    console.log(keywords)
    console.log(currentOrder)
    setItems(patients)
  }, [patients, keywords, currentOrder])

  return (
    <div className="flex">
      <Table
        selectList={selectList}
        setSelectList={setSelectList}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
        exportPartial={true}
        exportAll={true}
        add={"/patient/creation"}
        exportKey={[
          { label: "Id", key: "id" },
          { label: "userId", key: "userId" },
          { label: "Prénom", key: "firstName" },
          { label: "Nom", key: "lastName" },
          { label: "Numéro_Sécurité_Sociale", key: "securityNumber" },
          { label: "Genre", key: "gender" },
          { label: "Créé le", key: "createdAt" },
          { label: "Mis à jour le", key: "updatedAt" },
        ]}
        titre={`Liste des patients`}
        key="table_liste_patients"
        id="table_liste_patiens"
        setItemsPerPage={setItemsPerPage}
        itemsPerPage={itemsPerPage}
        multiSelect={false}
        items={items}
        keywords={keywords}
        setKeywords={setKeywords}
        setPage={setPage}
        count={count}
        paginationTop={{
          itemsPerPage: itemsPerPage,
          count,
          setPage,
          page,
          refetch,
        }}
        paginationBottom={{
          itemsPerPage: itemsPerPage,
          count,
          setPage,
          page,
          refetch,
        }}
        config={[
          {
            id: "id",
            th: {
              currentOrder,
              setCurrentOrder,
              colone: "id",
              text: "Id",
              order: true,
              orderColumn: "id",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.id,
            },
          },
          {
            id: "userId",
            th: {
              currentOrder,
              setCurrentOrder,
              colone: "userId",
              text: "userId",
              order: true,
              orderColumn: "userId",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.userId,
            },
          },
          {
            id: "firstName",
            th: {
              currentOrder,
              setCurrentOrder,
              colone: "firstName",
              text: "Prénom",
              order: true,
              orderColumn: "firstName",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.user.firstName,
            },
          },
          {
            id: "lastName",
            th: {
              currentOrder,
              setCurrentOrder,
              colone: "lastName",
              text: "Nom",
              order: true,
              orderColumn: "lastName",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.user.lastName,
            },
          },
          {
            id: "gender",
            th: {
              currentOrder,
              setCurrentOrder,
              colone: "gender",
              text: "Genre",
              order: true,
              orderColumn: "gender",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.user.gender,
            },
          },
          {
            id: "securityNumber",
            th: {
              currentOrder,
              setCurrentOrder,
              colone: "securityNumber",
              text: "Sécurité sociale",
              order: true,
              orderColumn: "securityNumber",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.user.securityNumber,
            },
          },
          {
            id: "createdAt",
            th: {
              currentOrder,
              setCurrentOrder,
              colone: "createdAt",
              text: "Créé le",
              order: true,
              orderColumn: "createdAt",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.createdAt.toLocaleString(),
            },
          },
          {
            id: "updatedAt",
            th: {
              currentOrder,
              setCurrentOrder,
              colone: "updatedAt",
              text: "Mis à jour le",
              order: true,
              orderColumn: "updatedAt",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.updatedAt.toLocaleString(),
            },
          },
          {
            id: "actions",
            th: {
              currentOrder,
              setCurrentOrder,
              text: "",
              order: true,
              thSpanClasses: "justify-content-between",
            },
            td: {
              type: "dropdown",
              text: (item: any) => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  height="20"
                  width="20"
                  className="m-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2z m0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              ),
              dropdown: [
                {
                  type: "link",
                  text: () => "Créer une ordonnance",
                  href: (item: any) => `/medecin/ordonnance/${item.id}`,
                },
                {
                  type: "link",
                  text: () => "Consultez les ordonnances créées",
                  href: (item: any) => `/medecin/patients/${item.id}`,
                },
              ],
            },
          },
        ]}
        empty="Aucune entreprise."
      />
    </div>
  )
}

export default TablePatients
