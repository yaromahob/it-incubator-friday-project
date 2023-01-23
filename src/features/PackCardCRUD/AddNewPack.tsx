import React, { ChangeEvent, useEffect, useState } from 'react'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { AddOrEditPack } from '../../common/ModalFields/AddOrEditPack/AddOrEditPack'
import { SaveAndCancelField } from '../../common/ModalFields/SaveAndCancelField/SaveAndCancelField'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { addPackTC } from '../PackList/PackList-reducer'
import styles from '../../common/ModalFields/ModalFields.module.scss'
import { setModalOpen } from '../../App/app-reducer'
import { newPackNameAC, newPackPrivateAC } from './packCardCRUD-reducer'

export const AddNewPack: React.FC<AddNewPackType> = ({ open, callback }) => {
  const newPackName = useAppSelector(state => state.packCardCRUD.namePack)
  const isPrivate = useAppSelector(state => state.packCardCRUD.privatePack)
  const dispatch = useAppDispatch()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(newPackNameAC(e.currentTarget.value))
  }

  const onPrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(newPackPrivateAC(e.target.checked))
  }

  const onSaveHandler = () => {
    dispatch(addPackTC({ cardsPack: { name: newPackName, private: isPrivate } }))
    dispatch(setModalOpen(false))
  }

  const onCancelHandler = () => {
    dispatch(newPackNameAC(''))
    dispatch(setModalOpen(false))
  }

  return (
    <div className={styles.modal}>
      <HeaderModal titleModal={'Add new pack'} />
      <AddOrEditPack newPackName={newPackName} onChange={onChangeHandler} isPrivate={isPrivate} onChangePrivate={onPrivateHandler} />
      <SaveAndCancelField type={'Save'} onAction={onSaveHandler} cancelAction={onCancelHandler} />
    </div>
  )
}

type AddNewPackType = {
  open: boolean
  callback: () => void
}
