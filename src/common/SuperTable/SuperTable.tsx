import React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { ActionButtonsContainer } from '../ActionButtonsContainer/ActionButtonsContainer'
import { CardType } from '../../features/PackList/packList-reducer'
import styles from './SuperTable.module.scss'

type SuperTableType = {
  titles: string[]
  data: CardType[]
  isAscSort: boolean
  ascActiveHandler: (askActive: boolean) => void
}

export const SuperTable: React.FC<SuperTableType> = ({
  titles,
  data,
  isAscSort,
  ascActiveHandler,
}) => {
  const sortHandler = () => {
    // true - asc \ false - desc
    ascActiveHandler(!isAscSort)
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {titles.map(title => {
              return (
                <TableCell
                  key={title}
                  className={styles.sortActive}
                  onClick={sortHandler}
                  align="left"
                >
                  {title}
                </TableCell>
                // <SuperSort sort={} value={} onChange={}/>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((card, i) => (
            <TableRow
              key={card.name + i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {card.name}
              </TableCell>
              <TableCell align="left">{card.cardsCount}</TableCell>
              <TableCell align="left">{card.updated}</TableCell>
              <TableCell align="left">{card.user_name}</TableCell>
              <TableCell align="left">
                <ActionButtonsContainer
                  educationsAction={() => alert()}
                  editAction={() => alert()}
                  deleteAction={() => alert()}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

