import React, { useState } from 'react'
import { SuperTable } from '../../common/SuperTable/SuperTable'
import { SortInfoType } from '../PackList/PackList'
import { useAppDispatch, useAppSelector } from '../../App/store'
import styles from './Cards.module.scss'
import searchIcon from '../../assets/svg/search.svg'
import SuperDebouncedInput from '../../common/SuperDebouncedInput/SuperDebouncedInput'
import { Grade } from '../../common/Grade/Grade'
import { setPackTC } from '../PackList/PackList-reducer'
import { BackToPackList } from '../BackToPackList/BackToPackList'
import { FriendOrMyCard } from '../FriendOrMyCard/FriendOrMyCard'
import { ActionButtonsContainer } from '../../common/ActionButtonsContainer/ActionButtonsContainer'
import { CardType } from '../../api/api-cardsList'
import { setAnswerValueAC, setIdEditCardAC, openDeleteCardModalAC, setQuestionValueAC, openEditCardModalAC } from './Card-reducer'
import { AddNewCard } from '../PackCardCRUD/AddNewCard'
import { useParams } from 'react-router-dom'
import { DeleteCard } from '../PackCardCRUD/DeleteCard'
import { EditCard } from '../PackCardCRUD/EditCard'

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
  const cardPacks = useAppSelector(state => state.cardList.cards)
  const isDisable = useAppSelector(state => state.packList.isDisabled)
  const cardPackID = cardPacks.find(item => item.user_id === profileID)
  const { question } = useAppSelector(state => state.cardList)
  const { packId } = useParams()
  const [sortInfo, setSortInfo] = useState<SortInfoType>({
    sortBy: null,
  })

  const onClickHandler = () => {
    if (sortInfo.sortBy === DESC) {
      dispatch(setPackTC({ sortPacks: '0updated' }))
      setSortInfo({ sortBy: ASC })
    }
    if (sortInfo.sortBy === ASC) {
      dispatch(setPackTC({ sortPacks: '1updated' }))
      setSortInfo({ sortBy: DESC })
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
        <SuperTable columns={columns2} data={cardPacks} onClick={onClickHandler} sortBy={sortInfo.sortBy} disabled={isDisable} />
      </div>
      <AddNewCard packId={packId!} />
      <DeleteCard nameItem={question} />
      <EditCard />
    </div>
  )
}
