import React, { useEffect } from 'react'
import { SuperTable } from 'common/SuperTable'
import { useAppDispatch, useAppSelector } from 'App/store'
import styles from './Cards.module.scss'
import searchIcon from 'assets/svg/search.svg'
import { SuperDebouncedInput } from 'common/SuperDebouncedInput'
import { Grade } from 'common/Grade'
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
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { DeleteCard } from '../PackCardCRUD/DeleteCard'
import { EditCard } from '../PackCardCRUD/EditCard'
import { sortByDateAC } from '../../App/app-reducer'
import { PATH } from 'root'
import { EditPack } from '../PackCardCRUD/EditPack'
import { PackType } from '../../api/api-packsList'
import login from '../Login/Login'
import { DeletePack } from '../PackCardCRUD/DeletePack'

const ASC = '0'
const DESC = '1'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { sortBy, isAuth } = useAppSelector(state => state.app)
  const profileID = useAppSelector(state => state.profile._id)
  const { isDisabled, cardPacks } = useAppSelector(state => state.packList)
  const { question, cards } = useAppSelector(state => state.cardList)
  const { packId } = useParams()
  const activePackList = cardPacks.find(item => item._id === packId)

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

  useEffect(() => {
    if (!isAuth) navigate(PATH.LOGIN)
  }, [])

  if (!activePackList) {
    return <Navigate to={PATH.PACK_LIST} />
  }
  console.log(activePackList)

  return (
    <div className={styles.listWrapper}>
      <div>
        <BackToPackList />
        <FriendOrMyCard cardPack={activePackList} />
        <div className={styles.interfaceField}>
          <div className={styles.search}>
            <span>Search</span>
            <div>
              <img src={searchIcon} alt="search icon" />
              <SuperDebouncedInput placeholder="Provide your text" />
            </div>
          </div>
        </div>
        <SuperTable columns={columns2} data={cards} onClick={onClickHandler} sortBy={sortBy} disabled={isDisabled} />
      </div>
      <AddNewCard packId={packId!} />
      <DeleteCard nameItem={question} />
      <EditCard />
      <EditPack />
      <DeletePack nameItem={activePackList.name} />
    </div>
  )
}
