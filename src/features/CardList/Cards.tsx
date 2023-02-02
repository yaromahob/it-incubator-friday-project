import React, { useState } from 'react'
import { SuperTable } from '../../common/SuperTable/SuperTable'
import { SortInfoType } from '../PackList/PackList'
import { useAppDispatch, useAppSelector } from '../../App/store'
import styles from './Cards.module.scss'
import searchIcon from '../../assets/svg/search.svg'
import SuperDebouncedInput from '../../common/SuperDebouncedInput/SuperDebouncedInput'
import { Grade } from '../../common/Grade/Grade'
import { BackToPackList } from '../BackToPackList/BackToPackList'
import { FriendOrMyCard } from '../FriendOrMyCard/FriendOrMyCard'
import { ActionButtonsContainer } from '../../common/ActionButtonsContainer/ActionButtonsContainer'
import { CardType } from '../../api/api-cardsList'
import {
  setAnswerValueAC,
  setIdEditCardAC,
  openDeleteCardModalAC,
  setQuestionValueAC,
  openEditCardModalAC,
  setCardTC,
} from './Card-reducer'
import { AddNewCard } from '../PackCardCRUD/AddNewCard'
import { useParams } from 'react-router-dom'
import { DeleteCard } from '../PackCardCRUD/DeleteCard'
import { EditCard } from '../PackCardCRUD/EditCard'
import { sortByDateAC } from '../../App/app-reducer'

const ASC = '0'
const DESC = '1'

export const Cards = () => {
  const profileID = useAppSelector(state => state.profile._id)
  const columns2 = [
    { key: 'question', name: 'Question' },
    { key: 'answer', name: 'Answer' },
    { key: 'updated', name: 'Last Updated' },
    {
      key: 'grade',
      name: 'Grade',
      render: (card: CardType) => {
        const cardID = card.user_id
        return (
          <div className={styles.renderWrapper}>
            <Grade id={card._id} />
            {profileID === cardID && (
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
