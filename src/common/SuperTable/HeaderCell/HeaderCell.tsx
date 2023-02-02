import React from 'react'
import TableCell from '@mui/material/TableCell'
import arrowDown from '../../../assets/svg/down.svg'
import arrowUp from '../../../assets/svg/up.svg'
import styles from '../SuperTable.module.scss'
import { ASC, DESC } from '../SuperTable'
import { useAppDispatch, useAppSelector } from '../../../App/store'
import { setSortValueAC } from '../../../App/app-reducer'

type HeaderCellType = {
  title: string
  sortField?: string | null
  sortBy: string | null
  onClickHandler: (value: string) => void
  disabled: boolean
}

export const HeaderCell: React.FC<HeaderCellType> = ({ title, sortField, onClickHandler, sortBy, disabled }) => {
  const dispatch = useAppDispatch()
  const activeSortField = useAppSelector(state => state.app.activeSortField)
  const DISABLED_SORT_FIELDS = ['Grade', 'Actions', 'Cover']

  const onClick = () => {
    if (!DISABLED_SORT_FIELDS.includes(title)) {
      sortField && onClickHandler(sortField)
      dispatch(setSortValueAC(title))
    }
  }

  return (
    <TableCell
      key={title}
      className={disabled ? `${styles.sortActive} ${styles.disabled}` : styles.sortActive}
      align="justify"
      onClick={onClick}
    >
      {title}
      {title === activeSortField && sortBy === DESC && <img src={arrowUp} alt="icon" />}
      {title === activeSortField && sortBy === ASC && <img src={arrowDown} alt="icon" />}
    </TableCell>
  )
}
