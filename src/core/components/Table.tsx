import { ReactNode } from "react"
import { useMutation } from "@blitzjs/rpc"
export interface TableProps<T> {
  data: T[]
  mutation: any // Replace 'any' with the actual type of your Blitz mutation
  children: ReactNode
}

export function Table<T>({ data, mutation, children }: TableProps<T>) {
  const [mutate] = useMutation(mutation)

  const handleRowClick = async (item: T) => {
    // Perform mutation on the clicked item
    await mutate(item)
  }

  return (
    <table>
      {/* Table header */}
      <thead>
        <tr>{/* Header cells */}</tr>
      </thead>
      {/* Table body */}
      <tbody>
        {/* Map over data and render rows */}
        {data?.map((item, index) => (
          <TableRow key={index} onClick={() => handleRowClick(item)}>
            {children}
          </TableRow>
        ))}
      </tbody>
    </table>
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
  return <td>{children}</td>
}
