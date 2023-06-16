import { ReactNode } from "react"
// Update the Table component to accept the "prescriptions" prop
export const PatientTable = ({ patients }) => {
  return (
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
            <TableCell>{patients.securityNumber}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </table>
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
