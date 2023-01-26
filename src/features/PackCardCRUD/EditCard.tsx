import React, { ChangeEvent } from 'react'
import { ModalFields } from '../../common/ModalFields/ModalFields'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { EditOrAddCard } from '../../common/ModalFields/EditOrAddCard/EditOrAddCard'
import styles from '../../common/ModalFields/ModalFields.module.scss'
import { SaveAndCancelField } from '../../common/ModalFields/SaveAndCancelField/SaveAndCancelField'
import { useAppDispatch, useAppSelector } from '../../App/store'
import {
  addCardTC,
  openEditCardModalAC,
  openNewCardModalAC,
  setAnswerValueAC,
  setQuestionValueAC,
  updateCardTC,
} from '../CardList/Card-reducer'

export const EditCard = () => {
  const dispatch = useAppDispatch()
  const { question, answer, idEditCard } = useAppSelector(state => state.cardList)

  const questionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestionValueAC(e.target.value))
  }

  const answerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAnswerValueAC(e.target.value))
  }

  const saveHandler = () => {
    dispatch(updateCardTC({ card: { _id: idEditCard, answer: answer, question: question } }))
    dispatch(openEditCardModalAC(false))
  }

  const cancelHandler = () => {
    dispatch(openEditCardModalAC(false))
    dispatch(setQuestionValueAC(''))
    dispatch(setAnswerValueAC(''))
  }

  return (
    <div className={styles.modal}>
      <HeaderModal titleModal={'Edit card'} />
      <EditOrAddCard questionCallback={questionHandler} answerCallback={answerHandler} question={question} answer={answer} />
      <SaveAndCancelField type={'Save'} onAction={saveHandler} cancelAction={cancelHandler} />
    </div>
  )
}
