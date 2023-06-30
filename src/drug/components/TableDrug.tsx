import { useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import Table from "src/core/components/table/Table"
import { useState, useEffect } from "react"
import getAllDrugs from "../queries/getAllDrugs"
import { Drug } from "@prisma/client"
import TablePrescription from "src/prescription/components/TablePrescription"

const TableDrugs = () => {
  const [keywords, setKeywords] = useState(null)
  const [items, setItems] = useState<any>()
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [currentOrder, setCurrentOrder] = useState<any>({ id: "asc" })
  const [page, setPage] = useState(0)
  const [selectList, setSelectList] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [loadingMulti, setLoadingMulti] = useState(true)

  const queryOptions: any = {
    orderBy: currentOrder,
    skip: itemsPerPage * page,
    take: itemsPerPage,
  }

  if (keywords !== null && keywords !== undefined && keywords !== "") {
    queryOptions.where = {
      OR: [
        { id: parseInt(keywords) || undefined },
        { name: keywords },
        // Ajoutez plus de conditions si nécessaire
      ],
    }
  }

  const [prescriptionDrug, setPrescriptionDrug] = useState([])

  const addToPrescription = (item: Drug) => {
    setPrescriptionDrug((prevPrescriptionDrug) => [...prevPrescriptionDrug, item])
    console.log(prescriptionDrug)
  }

  const [{ drugs, count }, { refetch }] = usePaginatedQuery(getAllDrugs, queryOptions)

  useEffect(() => {
    console.log(drugs)
    console.log(keywords)
    console.log(currentOrder)
    setItems(drugs)
  }, [drugs, keywords, currentOrder])

  return (
    <div className="flex flex-row">
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
            { label: "name", key: "name" },
          ]}
          titre={`Liste des médicament`}
          key="table_liste_médicaments"
          id="table_liste_médicaments"
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
              id: "name",
              th: {
                currentOrder,
                setCurrentOrder,
                colone: "name",
                text: "name",
                order: true,
                orderColumn: "name",
                thSpanClasses: "justify-content-between",
              },
              td: {
                text: (item: any) => item.name,
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
                    type: "button",
                    text: () => "Ajouter à l'ordonnance",
                    onClick: (item: any) => addToPrescription(item),
                  },
                ],
              },
            },
          ]}
          empty="Aucune entreprise."
        />
      </div>
      <div>
        <TablePrescription drugs={prescriptionDrug} />
      </div>
    </div>
  )
}

export default TableDrugs
