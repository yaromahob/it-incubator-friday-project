import React from 'react'
import { ModalFields } from '../../common/ModalFields/ModalFields'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { DeletePackOrCard } from '../../common/ModalFields/DeletePackOrCard/DeletePackOrCard'
import { SaveAndCancelField } from '../../common/ModalFields/SaveAndCancelField/SaveAndCancelField'
import styles from '../../common/ModalFields/ModalFields.module.scss'
import { deleteCardTC, setAnswerValueAC, openDeleteCardModalAC, setQuestionValueAC } from '../CardList/Card-reducer'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { setOpenModalEditPackAC } from '../PackList/PackList-reducer'

export const DeleteCard: React.FC<DeleteCardType> = ({ nameItem }) => {
  const dispatch = useAppDispatch()
  const idCard = useAppSelector(state => state.cardList.idEditCard)

  const deleteHandler = () => {
    dispatch(deleteCardTC(idCard))
    dispatch(openDeleteCardModalAC(false))
  }

  const cancelHandler = () => {
    dispatch(setOpenModalEditPackAC(false))
    dispatch(setQuestionValueAC(''))
    dispatch(setAnswerValueAC(''))
  }

  return (
    <div className={styles.modal}>
      <HeaderModal titleModal={'Delete Card'} />
      <DeletePackOrCard nameItem={nameItem} />
      <SaveAndCancelField type={'Delete'} onAction={deleteHandler} cancelAction={cancelHandler} />
    </div>
  )
}

type DeleteCardType = {
  nameItem: string
}
