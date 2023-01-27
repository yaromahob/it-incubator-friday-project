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
  const { textNewPack, isPrivateNewPack, idEditPack, isOpenModalEditPack } = useAppSelector(state => state.packList)

  const dispatch = useAppDispatch()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(textNewPackAC(e.currentTarget.value))
  }

  const onPrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(isPrivateNewPackAC(e.target.checked))
  }

  const onSaveHandler = () => {
    dispatch(updatePackTC({ cardsPack: { _id: idEditPack, name: textNewPack } }))
    dispatch(setOpenModalEditPackAC(false))
  }

  const onCancelHandler = () => {
    dispatch(textNewPackAC(''))
    dispatch(setOpenModalEditPackAC(false))
  }

  const closeModalEditPack = () => {
    textNewPack && dispatch(updatePackTC({ cardsPack: { _id: idEditPack, name: textNewPack, private: isPrivateNewPack } }))
    dispatch(setOpenModalEditPackAC(false))
  }

  return (
    <ModalFields open={isOpenModalEditPack} callback={closeModalEditPack}>
      <div className={styles.modal}>
        <HeaderModal titleModal={'Edit pack'} />
        <AddOrEditPack
          newPackName={textNewPack}
          onChange={onChangeHandler}
          isPrivate={isPrivateNewPack}
          onChangePrivate={onPrivateHandler}
        />
        <SaveAndCancelField type={'Save'} onAction={onSaveHandler} cancelAction={onCancelHandler} />
      </div>
    </ModalFields>
  )
}
