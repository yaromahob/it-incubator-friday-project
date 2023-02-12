import React, { ReactElement } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { HeaderCell } from './HeaderCell'
import { PackType } from 'api/api-packsList'
import { CardType } from 'api/api-cardsList'
import styles from './SuperTable.module.scss'

export const ASC = '0'
export const DESC = '1'

export const SuperTable: React.FC<SuperTableType> = ({ columns, data, onClick, sortBy, disabled }) => {
  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((title, i) => {
              return (
                <HeaderCell
                  key={`${title.key}-${i}`}
                  sortField={title.key}
                  sortBy={sortBy}
                  title={title.name}
                  onClickHandler={onClick}
                  disabled={disabled}
                />
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody className={styles.test}>
          {data &&
            data.map((card, i) => {
              const CARDS = card as CardType
              // if(CARDS.questionImg){
              //   console.log('SUPERTABLE', card)
              // }

              const cardItem = card as { [index: string]: string | number | boolean }
              // console.log(CARDS?.questionImg)
              return (
                <TableRow key={`${card.user_id}-${i}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {columns.map((col, i) => {
                    if (col.render) {
                      return (
                        <TableCell key={`${col}-${i}`} align={'justify'} component="th" scope="row">
                          {col.render(card)}
                        </TableCell>
                      )
                    }
                    if (col.deckCover) {
                      return (
                        <TableCell key={`${col}-${i}`} align={'justify'} component="th" scope="row">
                          <div className={styles.cardCover}>{col.deckCover(card)}</div>
                        </TableCell>
                      )
                    }
                    if (col.name === 'Question' && CARDS.questionImg && CARDS.questionImg !== 'noImg') {
                      return (
                        <TableCell key={`${col}_${i}`} align={'justify'} component="th" scope="row">
                          <img className={styles.cover} src={CARDS.questionImg} alt="question cover" />
                        </TableCell>
                      )
                    }
                    if (col.name === 'Answer' && CARDS.answerImg && CARDS.answerImg !== 'noImg') {
                      return (
                        <TableCell key={`${col}_${i}`} align={'justify'} component="th" scope="row">
                          <img className={styles.cover} src={CARDS.answerImg} alt="answer cover" />
                        </TableCell>
                      )
                    }

                    return (
                      <TableCell key={`${col}_${i}`} align={'justify'} component="th" scope="row">
                        {cardItem[col.key]}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
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
  deckCover?: (card: any) => ReactElement
}

type SuperTableType = {
  columns: Array<DataType>
  data: PackType[] | CardType[]
  onClick: (value: string) => void
  sortField?: string | null
  sortBy: string | null
  disabled: boolean
}
