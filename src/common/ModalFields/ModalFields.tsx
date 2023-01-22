import React from 'react'
import styles from './ModalFields.module.scss'
import { AddOrEditPack } from './AddOrEditPack/AddOrEditPack'
import { SaveAndCancelField } from './SaveAndCancelField/SaveAndCancelField'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 445,
  bgColor: 'background.paper',
  border: 'none',
  boxShadow: 24,
}

export const ModalFields: React.FC<ModalFieldsType> = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <div className={styles.modal}>{children}</div>
      </Box>
    </Modal>
  )
}

// types

type ModalFieldsType = {
  children: React.ReactNode
}
