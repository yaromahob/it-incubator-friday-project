import React, { ChangeEvent } from 'react'
import { ModalFields } from '../../common/ModalFields/ModalFields'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { EditOrAddCard } from '../../common/ModalFields/EditOrAddCard/EditOrAddCard'
import { AddOrEditPack } from '../../common/ModalFields/AddOrEditPack/AddOrEditPack'
import { SaveAndCancelField } from '../../common/ModalFields/SaveAndCancelField/SaveAndCancelField'
import styles from '../../common/ModalFields/ModalFields.module.scss'
import { useAppDispatch, useAppSelector } from '../../App/store'
import {
  addPackTC,
  isPrivateNewPackAC,
  setOpenModalEditPackAC,
  setOpenModalNewPackAC,
  textNewPackAC,
  updatePackTC,
} from '../PackList/PackList-reducer'

export const EditPack = () => {
  const editPackText = useAppSelector(state => state.packList.textNewPack)
  const isPrivate = useAppSelector(state => state.packList.isPrivateNewPack)
  const idPack = useAppSelector(state => state.packList.idEditPack)
  const dispatch = useAppDispatch()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(textNewPackAC(e.currentTarget.value))
  }

  const onPrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(isPrivateNewPackAC(e.target.checked))
  }

  const onSaveHandler = () => {
    dispatch(updatePackTC({ cardsPack: { _id: idPack, name: editPackText } }))
    dispatch(setOpenModalEditPackAC(false))
  }

  const onCancelHandler = () => {
    dispatch(textNewPackAC(''))
    dispatch(setOpenModalEditPackAC(false))
  }
  return (
    <div className={styles.modal}>
      <HeaderModal titleModal={'Edit pack'} />
      <AddOrEditPack newPackName={editPackText} onChange={onChangeHandler} isPrivate={isPrivate} onChangePrivate={onPrivateHandler} />
      <SaveAndCancelField type={'Save'} onAction={onSaveHandler} cancelAction={onCancelHandler} />
    </div>
  )
}
