import { Suspense, useEffect, useState } from "react"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation, usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import styles from "src/styles/Home.module.css"
import Table from "src/core/components/table/Table"
import getAllPatient from "src/pages/patient/queries/getAllPatient"
/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className={styles.button}
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage({ role: "patient" })} className={styles.button}>
          <strong>Sign Up</strong>
        </Link>
        <Link href={Routes.LoginPage()} className={styles.loginButton}>
          <strong>Login</strong>
        </Link>
      </>
    )
  }
}

const TablePatient = () => {
  const [keywords, setKeywords] = useState(null)
  const [items, setItems] = useState<any>()
  const [itemsPerPage, setItemsPerPage] = useState(60)
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
        { firstName: keywords },
        { lastName: keywords },
        { gender: keywords },
        { userId: parseInt(keywords) || undefined },
        // Ajoutez plus de conditions si nécessaire
      ],
    }
  }

  const [{ patient, count }, { refetch }] = usePaginatedQuery(getAllPatient, queryOptions)

  useEffect(() => {
    console.log(patient)
    console.log(keywords)
    console.log(currentOrder)
    setItems(patient)
  }, [patient, keywords, currentOrder])

  return (
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
            text: (item: any) => item.firstName,
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
            text: (item: any) => item.lastName,
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
            text: (item: any) => item.gender,
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
            text: (item: any) => item.securityNumber,
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
                text: () => "Afficher",
                href: (item: any) => `/patient/${item.id}`,
              },
            ],
          },
        },
      ]}
      empty="Aucune entreprise."
    />
  )
}

const HomePatient: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
      <Suspense fallback="Loading...">
        <TablePatient />
      </Suspense>
    </Layout>
  )
}

export default HomePatient
