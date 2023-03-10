import React, { ChangeEvent } from 'react'
import { ModalFields } from 'common/ModalFields'
import { HeaderModal } from 'common/ModalFields/HeaderModal'
import { AddOrEditPack } from 'common/ModalFields/AddOrEditPack'
import { SaveAndCancelField } from 'common/ModalFields/SaveAndCancelField'
import styles from 'common/ModalFields/ModalFields.module.scss'
import { useAppDispatch, useAppSelector } from 'App/store'
import { deckCoverForAddAC, isPrivateNewPackAC, setOpenModalEditPackAC, textNewPackAC, updatePackTC } from '../PackList/PackList-reducer'

export const EditPack = () => {
  const { textNewPack, isPrivateNewPack, idEditPack, isOpenModalEditPack, deckCoverForAdd } = useAppSelector(state => state.packList)
  const dispatch = useAppDispatch()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(textNewPackAC(e.currentTarget.value))
  }

  const onPrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(isPrivateNewPackAC(e.target.checked))
  }

  const onSaveHandler = () => {
    dispatch(updatePackTC({ cardsPack: { _id: idEditPack, name: textNewPack, deckCover: deckCoverForAdd } }))
    dispatch(setOpenModalEditPackAC(false))
    dispatch(deckCoverForAddAC(''))
  }

  const onCancelHandler = () => {
    dispatch(textNewPackAC(''))
    dispatch(deckCoverForAddAC(''))
    dispatch(setOpenModalEditPackAC(false))
  }

  const closeModalEditPack = () => {
    textNewPack &&
      dispatch(
        updatePackTC({
          cardsPack: {
            _id: idEditPack,
            name: textNewPack,
            deckCover: deckCoverForAdd,
            private: isPrivateNewPack,
          },
        })
      )
    dispatch(setOpenModalEditPackAC(false))
    dispatch(deckCoverForAddAC(''))
  }

  const addCoverHandler = (v: string) => {
    dispatch(deckCoverForAddAC(v))
  }

  return (
    <ModalFields open={isOpenModalEditPack} callback={closeModalEditPack}>
      <div className={styles.modal}>
        <HeaderModal titleModal={'Edit pack'} callback={onCancelHandler} />
        <AddOrEditPack
          newPackName={textNewPack}
          deckCoverForAdd={deckCoverForAdd}
          onChange={onChangeHandler}
          coverCallback={addCoverHandler}
          isPrivate={isPrivateNewPack}
          onChangePrivate={onPrivateHandler}
        />
        <SaveAndCancelField type={'Save'} onAction={onSaveHandler} cancelAction={onCancelHandler} />
      </div>
    </ModalFields>
  )
}
