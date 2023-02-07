import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './FriendOrMyCard.module.scss'
import { ActionButtonsContainer } from 'common/ActionButtonsContainer'
import { Navigate, useParams } from 'react-router-dom'
import {
  deleteCardTC,
  setAnswerValueAC,
  setCardTC,
  setIsLoggedInCardsAC,
  openNewCardModalAC,
  setQuestionValueAC,
} from '../CardList/Card-reducer'
import { useAppDispatch, useAppSelector } from 'App/store'
import { SuperButton } from 'common/SuperButton'
import { PATH } from '../../root'

export const FriendOrMyCard: React.FC<FriendOrMyCardType> = ({ cardPackID }) => {
  const popUpMenu = useRef(null)
  const [showAction, setShowAction] = useState(false)
  const dispatch = useAppDispatch()
  const setIsLoggedInCards = useAppSelector(state => state.cardList.setIsLoggedInCards)
  const userID = useAppSelector(state => state.profile._id)
  const { packOwner, packId } = useParams()

  const educationCardList = () => {
    dispatch(setIsLoggedInCardsAC(true))
  }

  const addCard = () => {
    dispatch(setQuestionValueAC(''))
    dispatch(setAnswerValueAC(''))
    dispatch(openNewCardModalAC(true))
  }

  const deleteCard = (id: string) => {
    dispatch(deleteCardTC(id))
  }

  const updateCard = (id: string, packName: string) => {
    // console.log(data)
  }

  const test = (event: MouseEvent) => {
    if (event.target === popUpMenu.current) setShowAction(true)
    if (event.target !== popUpMenu.current) setShowAction(false)
  }

  if (setIsLoggedInCards) {
    return <Navigate to={PATH.LEARN} />
  }

  useEffect(() => {
    if (!packId) return
    dispatch(setCardTC({ cardsPack_id: packId }))
  }, [packId])

  useEffect(() => {
    document.addEventListener('click', test)
    return () => document.removeEventListener('click', test)
  }, [])

  const learnToPackHandler = () => {
    return <Navigate to={PATH.PACK_LIST} />
  }

  if (packOwner === userID) {
    return (
      <div className={styles.myPackWrapper}>
        <div>
          <h2>My Pack</h2>
          <div className={styles.editMyPack} ref={popUpMenu}>
            <div className={styles.spanWrapper}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            {showAction && (
              <div className={styles.actionButtons}>
                <ActionButtonsContainer
                  id={packId!}
                  userId={userID}
                  cardsCount={5}
                  deleteAction={deleteCard}
                  editAction={updateCard}
                  educationsAction={educationCardList}
                />
              </div>
            )}
          </div>
        </div>
        <SuperButton onClick={addCard}>Add new card</SuperButton>
      </div>
    )
  } else {
    return (
      <div className={styles.myPackWrapper}>
        <h2>Friend’s Pack</h2>
        <SuperButton onClick={learnToPackHandler}>Learn to pack</SuperButton>
      </div>
    )
  }
}

type FriendOrMyCardType = {
  cardPackID?: string
}
