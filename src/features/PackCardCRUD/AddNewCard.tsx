import React, { ChangeEvent } from 'react'
import { ModalFields } from 'common/ModalFields/ModalFields'
import { HeaderModal } from 'common/ModalFields/HeaderModal'
import { EditOrAddCard } from 'common/ModalFields/EditOrAddCard'
import styles from 'common/ModalFields/ModalFields.module.scss'
import { SaveAndCancelField } from 'common/ModalFields/SaveAndCancelField'
import { useAppDispatch, useAppSelector } from 'App/store'
import {
  addCardTC,
  setAnswerValueAC,
  openNewCardModalAC,
  setQuestionValueAC,
  addCardQuestionImgAC,
  addCardAnswerImgAC,
} from '../CardList/Card-reducer'
import defaultPhoto from '../../assets/png/Lesson 1/default-answer-question-photo-card.png'

export const AddNewCard: React.FC<AddNewCardType> = ({ packId }) => {
  const dispatch = useAppDispatch()
  const { question, answer, openAddNewCardModal, addCardQuestionImg, addCardAnswerImg } = useAppSelector(state => state.cardList)

  const questionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestionValueAC(e.target.value))
  }

  const answerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAnswerValueAC(e.target.value))
  }
  const saveHandler = () => {
    dispatch(
      addCardTC({
        card: {
          cardsPack_id: packId,
          question: question!,
          answer: answer!,
          questionImg: addCardQuestionImg!,
          answerImg: addCardAnswerImg!,
        },
      })
    )
    dispatch(openNewCardModalAC(false))
    dispatch(setQuestionValueAC(''))
    dispatch(setAnswerValueAC(''))
    dispatch(addCardQuestionImgAC(''))
    dispatch(addCardAnswerImgAC(''))
  }

  const cancelHandler = () => {
    dispatch(openNewCardModalAC(false))
    dispatch(setQuestionValueAC(''))
    dispatch(setAnswerValueAC(''))
    dispatch(addCardQuestionImgAC(''))
    dispatch(addCardAnswerImgAC(''))
  }

  const closeAddModalHandler = () => {
    question &&
      dispatch(
        addCardTC({
          card: {
            cardsPack_id: packId!,
            question: question!,
            answer: answer!,
            questionImg: addCardQuestionImg!,
            answerImg: addCardAnswerImg!,
          },
        })
      )
    dispatch(openNewCardModalAC(false))
    dispatch(setQuestionValueAC(''))
    dispatch(setAnswerValueAC(''))
    dispatch(addCardQuestionImgAC(''))
    dispatch(addCardAnswerImgAC(''))
  }

  const CardQuestionHandler = (v: string) => {
    dispatch(addCardQuestionImgAC(v))
  }
  const CardAnswerHandler = (v: string) => {
    dispatch(addCardAnswerImgAC(v))
  }
  const photoQuestion = addCardQuestionImg ? addCardQuestionImg : defaultPhoto
  const photoAnswer = addCardAnswerImg ? addCardAnswerImg : defaultPhoto

  return (
    <ModalFields open={openAddNewCardModal} callback={closeAddModalHandler}>
      <div className={styles.modal}>
        <HeaderModal titleModal={'Add new card'} callback={closeAddModalHandler} />
        <EditOrAddCard
          questionImgCallback={photoQuestion}
          answerImgCallback={photoAnswer}
          questionCallback={questionHandler}
          answerCallback={answerHandler}
          question={question}
          answer={answer}
          CardQuestionHandler={CardQuestionHandler}
          CardAnswerHandler={CardAnswerHandler}
        />
        <SaveAndCancelField type={'Save'} onAction={saveHandler} cancelAction={cancelHandler} />
      </div>
    </ModalFields>
  )
}

type AddNewCardType = {
  packId: string
}
