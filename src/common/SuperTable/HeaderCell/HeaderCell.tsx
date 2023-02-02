import React from 'react'
import TableCell from '@mui/material/TableCell'
import arrowDown from '../../../assets/svg/down.svg'
import arrowUp from '../../../assets/svg/up.svg'
import styles from '../SuperTable.module.scss'
import { ASC, DESC } from '../SuperTable'
import { setSortValueAC } from '../../../features/PackList/PackList-reducer'
import { useAppDispatch, useAppSelector } from '../../../App/store'

type HeaderCellType = {
  title: string
  sortField?: string | null
  sortBy: string | null
  onClickHandler: (value: string | null) => void
  disabled: boolean
}

export const HeaderCell: React.FC<HeaderCellType> = ({ title, sortField, onClickHandler, sortBy, disabled }) => {
  const dispatch = useAppDispatch()
  const activeSortField = useAppSelector(state => state.packList.activeSortField)
  const DISABLED_FIELDS = ['Grade', 'Actions', 'Cover']

  const onClick = () => {
    if (!DISABLED_FIELDS.includes(title)) {
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
