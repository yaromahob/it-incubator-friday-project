import React from 'react'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { ModalFields } from '../../common/ModalFields/ModalFields'
import { DeletePackOrCard } from '../../common/ModalFields/DeletePackOrCard/DeletePackOrCard'
import { SaveAndCancelField } from '../../common/ModalFields/SaveAndCancelField/SaveAndCancelField'
import styles from '../../common/ModalFields/ModalFields.module.scss'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { deletePackTC, idEditPackAC, setOpenModalDeletePackAC } from '../PackList/PackList-reducer'

export const DeletePack: React.FC<DeletePackType> = ({ nameItem }) => {
  const dispatch = useAppDispatch()
  const { idEditPack } = useAppSelector(state => state.packList)

  const cancelActionHandler = () => {
    dispatch(setOpenModalDeletePackAC(false))
    dispatch(idEditPackAC(idEditPack))
  }

  const deleteActionHandler = () => {
    dispatch(deletePackTC(idEditPack))
    dispatch(setOpenModalDeletePackAC(false))
  }

  return (
    <div className={styles.modal}>
      <HeaderModal titleModal={'Delete Pack'} />
      <DeletePackOrCard nameItem={nameItem} />
      <SaveAndCancelField type={'Delete'} onAction={deleteActionHandler} cancelAction={cancelActionHandler} />
    </div>
  )
}

type DeletePackType = {
  nameItem: string
}
