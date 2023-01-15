import React from 'react'
import TableCell from '@mui/material/TableCell'
import arrowDown from '../../../assets/svg/down.svg'
import arrowUp from '../../../assets/svg/up.svg'
import styles from '../SuperTable.module.scss'
import { ASC, DESC } from '../SuperTable'

type HeaderCellType = {
  title: string
  sortField: string | null
  sortBy: string | null
  onClickHandler: (field: string) => void
}

export const HeaderCell: React.FC<HeaderCellType> = ({
  title,
  onClickHandler,
  sortField,
  sortBy,
}) => {
  const onClick = () => onClickHandler(title)
  return (
    <TableCell key={title} className={styles.sortActive} align="left" onClick={onClick}>
      {title}
      {title === sortField && sortBy === ASC && <img src={arrowUp} alt="icon" />}
      {title === sortField && sortBy === DESC && <img src={arrowDown} alt="icon" />}
    </TableCell>
  )
}


