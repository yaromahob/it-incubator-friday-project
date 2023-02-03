import React from 'react'
import styles from './EmptyCard.module.scss'
import { useAppDispatch, useAppSelector } from 'App/store'
import { BackToPackList } from '../../BackToPackList/BackToPackList'
import { openNewCardModalAC, setAnswerValueAC, setQuestionValueAC } from '../../CardList/Card-reducer'
import { Navigate, useParams } from 'react-router-dom'
import { AddNewCard } from '../../PackCardCRUD/AddNewCard'
import { PATH } from '../../../root'
import { SuperButton } from 'common/SuperButton'

export const EmptyCard = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.cardList.cards)
  console.log(cards)
  const { packOwner, packId } = useParams()
  const addCard = () => {
    dispatch(setQuestionValueAC(''))
    dispatch(setAnswerValueAC(''))
    dispatch(openNewCardModalAC(true))
  }

  if (cards.length) {
    return <Navigate to={`${PATH.CARD_LIST}/${packOwner}/${packId}`} />
  }

  return (
    <div>
      <div className={styles.pack}>
        <BackToPackList />
        <h2>Name Card</h2>
      </div>

      <div className={styles.main}>
        <div>This cards is empty. Click add new card to fill this pack</div>
        <SuperButton onClick={addCard}>Add new card</SuperButton>
      </div>
      <AddNewCard packId={packId!} />
    </div>
  )
}
