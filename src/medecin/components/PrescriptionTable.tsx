import { ReactNode } from "react"
// Update the Table component to accept the "prescriptions" prop
export const PrescriptionTable = ({ prescriptions }) => {
  return (
    <table>
      {/* Table header */}
      <thead>
        <tr>
          <th>Date</th>
          <th>Patient Id</th>
          <th>Drug Id</th>
          <th>Description</th>
        </tr>
      </thead>
      {/* Table body */}
      <tbody>
        {prescriptions.map((prescription, index) => (
          <TableRow key={index}>
            <TableCell>{prescription.date}</TableCell>
            <TableCell>{prescription.patientId}</TableCell>
            <TableCell>{prescription.drugId}</TableCell>
            <TableCell>{prescription.description}</TableCell>
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
