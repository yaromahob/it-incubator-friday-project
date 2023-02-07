import React, { useEffect, useState } from 'react'
import { SuperTable } from 'common/SuperTable'
import { SortInfoType } from '../PackList/PackList'
import { AppRootStateType, useAppDispatch, useAppSelector } from 'App/store'
import styles from './Cards.module.scss'
import searchIcon from 'assets/svg/search.svg'
import { SuperDebouncedInput } from 'common/SuperDebouncedInput'
import { Grade } from 'common/Grade'
import { setPackTC } from '../PackList/PackList-reducer'
import { BackToPackList } from '../BackToPackList/BackToPackList'
import { FriendOrMyCard } from '../FriendOrMyCard/FriendOrMyCard'
import { ActionButtonsContainer } from 'common/ActionButtonsContainer'
import { CardType } from 'api/api-cardsList'
import {
  setAnswerValueAC,
  setCardTC,
  setIdEditCardAC,
  openDeleteCardModalAC,
  setQuestionValueAC,
  openEditCardModalAC,
} from './Card-reducer'
import { AddNewCard } from '../PackCardCRUD/AddNewCard'
import { useNavigate, useParams } from 'react-router-dom'
import { DeleteCard } from '../PackCardCRUD/DeleteCard'
import { EditCard } from '../PackCardCRUD/EditCard'
import { sortByDateAC } from '../../App/app-reducer'
import { PATH } from 'root'

const ASC = '0'
const DESC = '1'

export const Cards = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const profileID = useAppSelector(state => state.profile._id)
  const columns2 = [
    { key: 'question', name: 'Question' },
    { key: 'answer', name: 'Answer' },
    { key: 'updated', name: 'Last Updated' },
    {
      key: 'grade',
      name: 'Grade',
      render: (card: CardType) => {
        return (
          <div className={styles.renderWrapper}>
            <Grade id={card._id} />
            {profileID === card.user_id && (
              <ActionButtonsContainer
                id={card._id}
                userId={card.user_id}
                packName={card.question}
                packAnswer={card.answer}
                editAction={updateCard}
                deleteAction={deleteCard}
              />
            )}
          </div>
        )
      },
    },
  ]

  const dispatch = useAppDispatch()
  const { sortBy } = useAppSelector(state => state.app)
  const cardPacks = useAppSelector(state => state.cardList.cards)
  const isDisable = useAppSelector(state => state.packList.isDisabled)
  const cardPackID = cardPacks.find(item => item.user_id === profileID)
  const { question } = useAppSelector(state => state.cardList)
  const { packId } = useParams()

  const onClickHandler = (value: string | null) => {
    if (sortBy === DESC) {
      dispatch(setCardTC({ cardsPack_id: packId!, sortCards: `0${value}` }))
      dispatch(sortByDateAC(ASC))
    }

    if (sortBy === ASC) {
      dispatch(setCardTC({ cardsPack_id: packId!, sortCards: `1${value}` }))
      dispatch(sortByDateAC(DESC))
    }
  }

  const deleteCard = (id: string, packName: string) => {
    dispatch(openDeleteCardModalAC(true))
    dispatch(setQuestionValueAC(packName))
    dispatch(setIdEditCardAC(id))
  }

  const updateCard = (id: string, packName: string, packAnswer: string | undefined) => {
    dispatch(openEditCardModalAC(true))
    dispatch(setQuestionValueAC(packName))
    dispatch(setAnswerValueAC(packAnswer!))
    dispatch(setIdEditCardAC(id))
  }

  if (!isLoggedIn) navigate(PATH.LOGIN)

  return (
    <div className={styles.listWrapper}>
      <div>
        <BackToPackList />
        <FriendOrMyCard cardPackID={cardPackID && cardPackID.user_id} />
        <div className={styles.interfaceField}>
          <div className={styles.search}>
            <span>Search</span>
            <div>
              <img src={searchIcon} alt="search icon" />
              <SuperDebouncedInput placeholder="Provide your text" />
            </div>
          </div>
        </div>
        <SuperTable columns={columns2} data={cardPacks} onClick={onClickHandler} sortBy={sortBy} disabled={isDisable} />
      </div>
      <AddNewCard packId={packId!} />
      <DeleteCard nameItem={question} />
      <EditCard />
    </div>
  )
}
