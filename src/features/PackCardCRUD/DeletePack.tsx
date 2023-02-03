import React from 'react'
import { HeaderModal } from 'common/ModalFields/HeaderModal'
import { ModalFields } from 'common/ModalFields'
import { DeletePackOrCard } from 'common/ModalFields/DeletePackOrCard'
import { SaveAndCancelField } from 'common/ModalFields/SaveAndCancelField'
import styles from 'common/ModalFields/ModalFields.module.scss'
import { useAppDispatch, useAppSelector } from 'App/store'
import { deletePackTC, idEditPackAC, setOpenModalDeletePackAC } from '../PackList/PackList-reducer'

export const DeletePack: React.FC<DeletePackType> = ({ nameItem }) => {
  const dispatch = useAppDispatch()
  const { idEditPack, isOpenModalDeletePack } = useAppSelector(state => state.packList)

  const cancelActionHandler = () => {
    dispatch(setOpenModalDeletePackAC(false))
    dispatch(idEditPackAC(idEditPack))
  }

  const deleteActionHandler = () => {
    dispatch(deletePackTC(idEditPack))
    dispatch(setOpenModalDeletePackAC(false))
  }

  const closeModalDeletePack = () => {
    dispatch(setOpenModalDeletePackAC(false))
    dispatch(idEditPackAC(''))
  }

  return (
    <ModalFields open={isOpenModalDeletePack} callback={closeModalDeletePack}>
      <div className={styles.modal}>
        <HeaderModal titleModal={'Delete Pack'} callback={cancelActionHandler} />
        <DeletePackOrCard nameItem={nameItem} />
        <SaveAndCancelField type={'Delete'} onAction={deleteActionHandler} cancelAction={cancelActionHandler} />
      </div>
    </ModalFields>
  )
}

type DeletePackType = {
  nameItem: string
}
