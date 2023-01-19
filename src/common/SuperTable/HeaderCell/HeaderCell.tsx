import React from 'react'
import TableCell from '@mui/material/TableCell'
import arrowDown from '../../../assets/svg/down.svg'
import arrowUp from '../../../assets/svg/up.svg'
import styles from '../SuperTable.module.scss'
import { ASC, DESC } from '../SuperTable'

type HeaderCellType = {
  title: string
  sortField?: string | null
  sortBy: string | null
  onClickHandler: () => void
  disabled: boolean
}

export const HeaderCell: React.FC<HeaderCellType> = ({ title, sortField, onClickHandler, sortBy, disabled }) => {
  const onClick = () => onClickHandler()
  return (
    <TableCell
      key={title}
      className={disabled ? `${styles.sortActive} ${styles.disabled}` : styles.sortActive}
      align="left"
      onClick={onClick}
    >
      {title}
      {title === 'Last Updated' && sortBy === ASC && <img src={arrowUp} alt="icon" />}
      {title === 'Last Updated' && sortBy === DESC && <img src={arrowDown} alt="icon" />}
    </TableCell>
  )
}
