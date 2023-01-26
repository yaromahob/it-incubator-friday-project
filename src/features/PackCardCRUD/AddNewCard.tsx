import React, { ChangeEvent } from 'react'
import { ModalFields } from '../../common/ModalFields/ModalFields'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { EditOrAddCard } from '../../common/ModalFields/EditOrAddCard/EditOrAddCard'
import styles from '../../common/ModalFields/ModalFields.module.scss'
import { SaveAndCancelField } from '../../common/ModalFields/SaveAndCancelField/SaveAndCancelField'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { addCardTC, setAnswerValueAC, openNewCardModalAC, setQuestionValueAC } from '../CardList/Card-reducer'

export const AddNewCard: React.FC<AddNewCardType> = ({ packId }) => {
  const dispatch = useAppDispatch()
  const { question, answer, openAddNewCardModal } = useAppSelector(state => state.cardList)

  const questionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestionValueAC(e.target.value))
  }

  const answerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAnswerValueAC(e.target.value))
  }

  const saveHandler = () => {
    dispatch(addCardTC({ card: { cardsPack_id: packId, question: question, answer: answer } }))
    dispatch(openNewCardModalAC(false))
    dispatch(setQuestionValueAC(''))
    dispatch(setAnswerValueAC(''))
  }

  const cancelHandler = () => {
    dispatch(openNewCardModalAC(false))
    dispatch(setQuestionValueAC(''))
    dispatch(setAnswerValueAC(''))
  }

  const closeAddModalHandler = () => {
    question && dispatch(addCardTC({ card: { cardsPack_id: packId!, question: question, answer: answer } }))
    dispatch(openNewCardModalAC(false))
    dispatch(setQuestionValueAC(''))
    dispatch(setAnswerValueAC(''))
  }

  return (
    <ModalFields open={openAddNewCardModal} callback={closeAddModalHandler}>
      <div className={styles.modal}>
        <HeaderModal titleModal={'Add new card'} />
        <EditOrAddCard questionCallback={questionHandler} answerCallback={answerHandler} question={question} answer={answer} />
        <SaveAndCancelField type={'Save'} onAction={saveHandler} cancelAction={cancelHandler} />
      </div>
    </ModalFields>
  )
}
//
// <ModalFields open={openAddNewCardModal} callback={closeAddModalHandler}>
//   <AddNewCard packId={packId!} />
// </ModalFields>

type AddNewCardType = {
  packId: string
}
