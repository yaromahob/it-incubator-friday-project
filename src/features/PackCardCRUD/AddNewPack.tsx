import React, { ChangeEvent, useEffect, useState } from 'react'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { AddOrEditPack } from '../../common/ModalFields/AddOrEditPack/AddOrEditPack'
import { SaveAndCancelField } from '../../common/ModalFields/SaveAndCancelField/SaveAndCancelField'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { addPackTC, isPrivateNewPackAC, setOpenModalNewPackAC, textNewPackAC } from '../PackList/PackList-reducer'
import styles from '../../common/ModalFields/ModalFields.module.scss'

export const AddNewPack = () => {
  const newPackName = useAppSelector(state => state.packList.textNewPack)
  const isPrivate = useAppSelector(state => state.packList.isPrivateNewPack)
  const dispatch = useAppDispatch()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(textNewPackAC(e.currentTarget.value))
    console.log(newPackName)
  }

  const onPrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(isPrivateNewPackAC(e.target.checked))
  }

  const onSaveHandler = () => {
    dispatch(addPackTC({ cardsPack: { name: newPackName, private: isPrivate } }))
    dispatch(setOpenModalNewPackAC(false))
  }

  const onCancelHandler = () => {
    dispatch(textNewPackAC(''))
    dispatch(setOpenModalNewPackAC(false))
  }

  return (
    <div className={styles.modal}>
      <HeaderModal titleModal={'Add new pack'} />
      <AddOrEditPack newPackName={newPackName} onChange={onChangeHandler} isPrivate={isPrivate} onChangePrivate={onPrivateHandler} />
      <SaveAndCancelField type={'Save'} onAction={onSaveHandler} cancelAction={onCancelHandler} />
    </div>
  )
}
