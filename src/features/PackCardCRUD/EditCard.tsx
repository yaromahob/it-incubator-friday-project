import React, { ChangeEvent, useEffect, useState } from 'react'
import { ModalFields } from 'common/ModalFields'
import { HeaderModal } from 'common/ModalFields/HeaderModal'
import { EditOrAddCard } from 'common/ModalFields/EditOrAddCard'
import styles from 'common/ModalFields/ModalFields.module.scss'
import { SaveAndCancelField } from 'common/ModalFields/SaveAndCancelField'
import { useAppDispatch, useAppSelector } from 'App/store'
import {
  addCardAnswerImgAC,
  addCardQuestionImgAC,
  openEditCardModalAC,
  setAnswerValueAC,
  setQuestionValueAC,
  updateCardsAC,
  updateCardTC,
} from '../CardList/Card-reducer'
import defaultPhoto from 'assets/png/Lesson 1/default-answer-question-photo-card.png'

export const EditCard = () => {
  const dispatch = useAppDispatch()
  const { question, answer, idEditCard, openEditCardModal } = useAppSelector(state => state.cardList)
  const cards = useAppSelector(state => state.cardList.cards)

  const Card = cards?.find(c => c._id === idEditCard)
  const questionImg = Card?.questionImg || ''
  const answerImg = Card?.answerImg || ''

  const [cardQuestionImg, setCardQuestionImg] = useState('')
  const [cardAnswerImg, setCardAnswerImg] = useState('')
  console.log({ cardQuestionImg, cardAnswerImg, questionImg, answerImg })

  const questionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuestionValueAC(e.target.value))
    dispatch(addCardQuestionImgAC('noImg'))
    dispatch(updateCardsAC({ _id: idEditCard, questionImg: 'noImg' }, idEditCard))
    setCardQuestionImg('noImg')
  }
  const answerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAnswerValueAC(e.target.value))
    dispatch(addCardAnswerImgAC('noImg'))
    dispatch(updateCardsAC({ _id: idEditCard, answerImg: 'noImg' }, idEditCard))
    setCardAnswerImg('noImg')
  }
  const saveHandler = () => {
    dispatch(
      updateCardTC({
        card: {
          _id: idEditCard,
          answer: answer,
          question: question,
          answerImg: cardAnswerImg,
          questionImg: cardQuestionImg,
        },
      })
    )
    dispatch(openEditCardModalAC(false))
    dispatch(setQuestionValueAC(''))
    dispatch(setAnswerValueAC(''))
    dispatch(addCardQuestionImgAC(''))
    dispatch(addCardAnswerImgAC(''))
    setCardQuestionImg('')
    setCardAnswerImg('')
  }
  const cancelHandler = () => {
    dispatch(openEditCardModalAC(false))
    dispatch(setQuestionValueAC(''))
    dispatch(setAnswerValueAC(''))
    dispatch(addCardQuestionImgAC(''))
    dispatch(addCardAnswerImgAC(''))
    setCardQuestionImg('')
    setCardAnswerImg('')
  }

  const CardQuestionHandler = (v: string) => {
    setCardQuestionImg(v)
    dispatch(setQuestionValueAC(''))
  }
  const CardAnswerHandler_ = (v: string) => {
    setCardAnswerImg(v)
    dispatch(setAnswerValueAC(''))
  }

  useEffect(() => {
    if (questionImg) {
      setCardQuestionImg(questionImg)
    }

    if (answerImg) {
      setCardAnswerImg(answerImg)
    }
  }, [questionImg, answerImg])

  return (
    <ModalFields open={openEditCardModal} callback={cancelHandler}>
      <div className={styles.modal}>
        <HeaderModal titleModal={'Edit card'} callback={cancelHandler} />
        <EditOrAddCard
          questionImgCallback={cardQuestionImg === 'noImg' || !cardQuestionImg ? defaultPhoto : cardQuestionImg}
          answerImgCallback={cardAnswerImg === 'noImg' || !cardAnswerImg ? defaultPhoto : cardAnswerImg}
          questionCallback={questionHandler}
          answerCallback={answerHandler}
          question={question}
          answer={answer}
          CardQuestionHandler={CardQuestionHandler}
          CardAnswerHandler={CardAnswerHandler_}
        />
        <SaveAndCancelField type={'Save'} onAction={saveHandler} cancelAction={cancelHandler} />
      </div>
    </ModalFields>
  )
}
