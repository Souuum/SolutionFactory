import { useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import Table from "src/core/components/table/Table"
import getAllDrugs from "../queries/getAllDrugs"
import { useState, useEffect } from "react"

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
        { stock: keywords },
        { holder: keywords },
        { pharmaShape: keywords },
        { admWay: keywords },
      ],
    }
  }

  const [{ drugs, count }, { refetch }] = usePaginatedQuery(getAllDrugs, queryOptions)

  useEffect(() => {
    console.log(drugs)
    console.log(keywords)
    console.log(currentOrder)
    setItems(drugs)
  }, [drugs, keywords, currentOrder])

  return (
    <div className="flex">
      <Table
        selectList={selectList}
        setSelectList={setSelectList}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
        exportPartial={true}
        exportAll={true}
        add={"/drug/creation"}
        exportKey={[
          { label: "Id", key: "id" },
          { label: "Dénomination", key: "name" },
          { label: "Titulaire.s", key: "holder" },
          { label: "Forme pharmaceutique", key: "pharmaShape" },
          { label: "Voie d'administration", key: "admWay" },
          { label: "Surveillence renforcée", key: "monitoring" },
        ]}
        titre={`Liste des Médicaments`}
        key="table_liste_drugs"
        id="table_liste_drugs"
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
              text: "Dénomination",
              order: true,
              orderColumn: "name",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.name,
            },
          },
          {
            id: "stock",
            th: {
              currentOrder,
              setCurrentOrder,
              colone: "stock",
              text: "Disponible",
              order: true,
              orderColumn: "stock",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.stock,
            },
          },
          {
            id: "holder",
            th: {
              currentOrder,
              setCurrentOrder,
              colone: "holder",
              text: "Titulaire.s",
              order: true,
              orderColumn: "holder",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.holder,
            },
          },
          {
            id: "pharmaShape",
            th: {
              currentOrder,
              setCurrentOrder,
              colone: "pharmaShape",
              text: "Forme pharmaceutique",
              order: true,
              orderColumn: "pharmaShape",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.pharmaShape,
            },
          },
          {
            id: "admWay",
            th: {
              currentOrder,
              setCurrentOrder,
              colone: "admWay",
              text: "Voie d'administration",
              order: true,
              orderColumn: "admWay",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.admWay,
            },
          },
          {
            id: "monitoring",
            th: {
              currentOrder,
              setCurrentOrder,
              colone: "monitoring",
              text: "Surveillance renforcée",
              order: true,
              orderColumn: "monitoring",
              thSpanClasses: "justify-content-between",
            },
            td: {
              text: (item: any) => item.monitoring,
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
            },
          },
        ]}
        empty="Aucune entreprise."
      />
    </div>
  )
}

export default TableDrugs
