import React, { useEffect } from 'react'
import styles from './ModalFields.module.scss'
import { AddOrEditPack } from './AddOrEditPack/AddOrEditPack'
import { SaveAndCancelField } from './SaveAndCancelField/SaveAndCancelField'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { setModalOpen } from '../../App/app-reducer'
import { useAppDispatch, useAppSelector } from '../../App/store'

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

export const ModalFields: React.FC<ModalFieldsType> = ({ open, callback, children }) => {
  const dispatch = useAppDispatch()
  const handleClose = () => callback()

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>{children}</Box>
    </Modal>
  )
}

// types

type ModalFieldsType = {
  open: boolean
  callback: () => void
  children: React.ReactNode
}
