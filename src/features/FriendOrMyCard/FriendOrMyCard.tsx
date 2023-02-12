import React, { useEffect, useRef, useState } from 'react'
import styles from './FriendOrMyCard.module.scss'
import { ActionButtonsContainer } from 'common/ActionButtonsContainer'
import { Navigate, useParams } from 'react-router-dom'
import {
  deleteCardTC,
  openEditCardModalAC,
  updateCardTC,
} from '../CardList/Card-reducer'
import { setAnswerValueAC, setCardTC, setIsLoggedInCardsAC, openNewCardModalAC, setQuestionValueAC } from '../CardList/Card-reducer'
import { useAppDispatch, useAppSelector } from 'App/store'
import { SuperButton } from 'common/SuperButton'
import { PATH } from '../../root'
import {
  deckCoverForAddAC,
  idEditPackAC,
  setOpenModalDeletePackAC,
  setOpenModalEditPackAC,
  textNewPackAC,
} from '../PackList/PackList-reducer'
import { PackType } from '../../api/api-packsList'

export const FriendOrMyCard: React.FC<FriendOrMyCardType> = ({ cardPack }) => {
  const popUpMenu = useRef(null)
  const [showAction, setShowAction] = useState(false)
  const dispatch = useAppDispatch()
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

  const deleteCard = () => {
    dispatch(setOpenModalDeletePackAC(true))
    dispatch(textNewPackAC(cardPack.name))
    dispatch(idEditPackAC(cardPack._id))
  }

  const editPack = () => {
    dispatch(textNewPackAC(cardPack.name))
    dispatch(deckCoverForAddAC(cardPack.deckCover))
    dispatch(idEditPackAC(cardPack._id))
    dispatch(setOpenModalEditPackAC(true))
  }

  const closePopUp = (event: MouseEvent) => {
    if (event.target === popUpMenu.current) setShowAction(true)
    if (event.target !== popUpMenu.current) setShowAction(false)
  }

  useEffect(() => {
    if (!packId) return
    dispatch(setCardTC({ cardsPack_id: packId }))
  }, [packId])

  useEffect(() => {
    document.addEventListener('click', closePopUp)
    return () => document.removeEventListener('click', closePopUp)
  }, [])

  const learnToPackHandler = () => {
    return <Navigate to={PATH.PACK_LIST} />
  }

  if (packOwner === userID) {
    return (
      <div className={styles.myPackWrapper}>
        <div>
          <h2>{cardPack.name}</h2>
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
                  editAction={editPack}
                  educationsAction={educationCardList}
                />
              </div>
            )}
          </div>
          {cardPack.deckCover && (
            <div className={styles.coverPack}>
              <img src={cardPack.deckCover} alt="cover Pack" />
            </div>
          )}
        </div>
        <SuperButton onClick={addCard}>Add new card</SuperButton>
      </div>
    )
  } else {
    return (
      <div className={styles.myPackWrapper}>
        <div>
          <h2>{cardPack.name}</h2>
          {cardPack.deckCover && (
            <div className={styles.coverPack}>
              <img src={cardPack.deckCover} alt="cover Pack" />
            </div>
          )}
        </div>
        <SuperButton onClick={learnToPackHandler}>Learn to pack</SuperButton>
      </div>
    )
  }
}

type FriendOrMyCardType = {
  cardPack: PackType
}
