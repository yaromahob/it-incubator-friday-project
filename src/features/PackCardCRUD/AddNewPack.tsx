import React, { ChangeEvent } from 'react'
import { HeaderModal } from 'common/ModalFields/HeaderModal'
import { AddOrEditPack } from 'common/ModalFields/AddOrEditPack'
import { SaveAndCancelField } from 'common/ModalFields/SaveAndCancelField'
import { useAppDispatch, useAppSelector } from 'App/store'
import { addPackTC, deckCoverForAddAC, isPrivateNewPackAC, setOpenModalNewPackAC, textNewPackAC } from '../PackList/PackList-reducer'
import styles from 'common/ModalFields/ModalFields.module.scss'
import { ModalFields } from 'common/ModalFields'

export const AddNewPack = () => {
  const { textNewPack, isPrivateNewPack, isOpenModalNewPack, deckCoverForAdd } = useAppSelector(state => state.packList)
  const dispatch = useAppDispatch()

  const closeModalNewPack = () => {
    textNewPack &&
      dispatch(
        addPackTC({
          cardsPack: {
            name: textNewPack,
            private: isPrivateNewPack,
            deckCover: deckCoverForAdd ? deckCoverForAdd : '',
          },
        })
      )
    dispatch(setOpenModalNewPackAC(false))
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(textNewPackAC(e.currentTarget.value))
  }

  const onPrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(isPrivateNewPackAC(e.target.checked))
  }

  const onSaveHandler = () => {
    dispatch(
      addPackTC({
        cardsPack: {
          name: textNewPack,
          private: isPrivateNewPack,
          deckCover: deckCoverForAdd ? deckCoverForAdd : '',
        },
      })
    )
    dispatch(setOpenModalNewPackAC(false))
  }

  const onCancelHandler = () => {
    dispatch(textNewPackAC(''))
    dispatch(deckCoverForAddAC(''))
    dispatch(setOpenModalNewPackAC(false))
  }

  return (
    <ModalFields open={isOpenModalNewPack} callback={closeModalNewPack}>
      <div className={styles.modal}>
        <HeaderModal titleModal={'Add new pack'} callback={onCancelHandler} />
        <AddOrEditPack
          newPackName={textNewPack}
          deckCoverForAdd={deckCoverForAdd}
          onChange={onChangeHandler}
          isPrivate={isPrivateNewPack}
          onChangePrivate={onPrivateHandler}
        />
        <SaveAndCancelField type={'Save'} onAction={onSaveHandler} cancelAction={onCancelHandler} />
      </div>
    </ModalFields>
  )
}
