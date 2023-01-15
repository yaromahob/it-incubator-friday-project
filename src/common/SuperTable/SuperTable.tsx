import React, { ReactElement } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { HeaderCell } from './HeaderCell/HeaderCell'
import { PackType } from '../../features/Pack'

export const ASC = '0'
export const DESC = '1'

export const SuperTable: React.FC<SuperTableType> = ({ columns, data, onClick, sortField, sortBy }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((title, i) => {
              return (
                <HeaderCell
                  key={`${title.key}-${i}`}
                  onClickHandler={onClick}
                  sortField={sortField}
                  sortBy={sortBy}
                  title={title.name}
                ></HeaderCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((card: { [index: string]: string | number | boolean }, i) => (
            <TableRow key={`${data}-${i}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map((col, i) => {
                if (col.render) {
                  return (
                    <TableCell key={`${col}-${i}`} component="th" scope="row">
                      {col.render(card)}
                    </TableCell>
                  )
                }
                return (
                  <TableCell key={`${col}_${i}`} component="th" scope="row">
                    {card[col.key]}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

// types

type DataType = {
  key: string
  name: string
  render?: (card: any) => ReactElement
}

type SuperTableType = {
  columns: Array<DataType>
  data: PackType[]
  onClick: (field: string) => void
  sortField: string | null
  sortBy: string | null
}
