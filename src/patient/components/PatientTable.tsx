import { ReactNode } from "react"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { Link } from "next/link"
import getAllPatients from "../queries/getAllPatients"

const ITEMS_PER_PAGE = 6

export const PatientTable = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ patients, hasMore }] = usePaginatedQuery(getAllPatients, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })
  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8">
      <div className="text-end">
        <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
          <div className=" relative ">
            <input
              type="text"
              id='"form-subscribe-Filter'
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="name"
            />
          </div>
          <button
            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            type="submit"
          >
            Filter
          </button>
        </form>
      </div>
      <table className="min-w-full leading-normal">
        {/* Table header */}
        <thead>
          <tr>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Numéro de sécurité sociale</TableHead>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {patients?.map((patient, index) => (
            <TableRow key={index}>
              <TableCell>{patient.lastName}</TableCell>
              <TableCell>{patient.firstName}</TableCell>
              <TableCell>{patient.securityNumber}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </table>
      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

export interface TableHeadProps {
  children?: ReactNode
  onClick?: () => void
}

export function TableHead({ children, onClick }: TableHeadProps) {
  return (
    <th className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
      {children}
    </th>
  )
}

export interface TableRowProps {
  children?: ReactNode
  onClick?: () => void
}
export function TableRow({ children, onClick }: TableRowProps) {
  return <tr onClick={onClick}>{children}</tr>
}

export interface TableCellProps {
  children?: ReactNode
}

export function TableCell({ children }: TableCellProps) {
  return <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">{children}</td>
}
