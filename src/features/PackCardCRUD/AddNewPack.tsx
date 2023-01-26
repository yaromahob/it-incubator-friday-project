import React, { ChangeEvent } from 'react'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { AddOrEditPack } from '../../common/ModalFields/AddOrEditPack/AddOrEditPack'
import { SaveAndCancelField } from '../../common/ModalFields/SaveAndCancelField/SaveAndCancelField'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { addPackTC, isPrivateNewPackAC, setOpenModalNewPackAC, textNewPackAC } from '../PackList/PackList-reducer'
import styles from '../../common/ModalFields/ModalFields.module.scss'

export const AddNewPack = () => {
  const { textNewPack, isPrivateNewPack } = useAppSelector(state => state.packList)
  const dispatch = useAppDispatch()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(textNewPackAC(e.currentTarget.value))
  }

  const onPrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(isPrivateNewPackAC(e.target.checked))
  }

  const onSaveHandler = () => {
    dispatch(addPackTC({ cardsPack: { name: textNewPack, private: isPrivateNewPack } }))
    dispatch(setOpenModalNewPackAC(false))
  }

  const onCancelHandler = () => {
    dispatch(textNewPackAC(''))
    dispatch(setOpenModalNewPackAC(false))
  }

  return (
    <div className={styles.modal}>
      <HeaderModal titleModal={'Add new pack'} />
      <AddOrEditPack newPackName={textNewPack} onChange={onChangeHandler} isPrivate={isPrivateNewPack} onChangePrivate={onPrivateHandler} />
      <SaveAndCancelField type={'Save'} onAction={onSaveHandler} cancelAction={onCancelHandler} />
    </div>
  )
}
