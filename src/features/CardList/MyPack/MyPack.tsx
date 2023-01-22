import React, { useEffect, useState } from 'react'
import { SuperTable } from '../../../common/SuperTable/SuperTable'
import { SortInfoType } from '../../PackList/PackList'
import { useAppDispatch, useAppSelector } from '../../../App/store'
import styles from './MyPack.module.scss'
import SuperButton from '../../../common/SuperButton/SuperButton'
import searchIcon from '../../../assets/svg/search.svg'
import SuperDebouncedInput from '../../../common/SuperDebouncedInput/SuperDebouncedInput'
import { Grade } from '../../../common/Grade/Grade'
import { PackType } from '../../../api/api-packsList'
import { ActionButtonsContainer } from '../../../common/ActionButtonsContainer/ActionButtonsContainer'
import { setPackTC } from '../../PackList/PackList-reducer'
import { BackToPackList } from '../../BackToPackList/BackToPackList'
import { addCardTC, setCardTC } from '../Card-reducer'
import { useParams } from 'react-router-dom'

const ASC = '0'
const DESC = '1'

export const MyPack = () => {
  const columns = [
    { key: 'question', name: 'Question' },
    { key: 'answer', name: 'Answer' },
    { key: 'updated', name: 'Last Updated' },
    {
      key: 'grade',
      name: 'Grade',
      render: (card: PackType) => {
        return (
          <div className={styles.renderWrapper}>
            <Grade id={card._id} />
            <ActionButtonsContainer
              id={card._id}
              userId={card.user_id}
              cardsCount={card.cardsCount}
              editAction={updateCard}
              deleteAction={deleteCard}
            />
          </div>
        )
      },
    },
  ]

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.app.isAuth)
  const cardPacks = useAppSelector(state => state.cardList.cards)
  const userID = useAppSelector(state => state.profile._id)
  const [showAction, setShowAction] = useState(false)
  const isDisable = useAppSelector(state => state.packList.isDisabled)

  const { packId } = useParams()
  console.log(packId)
  useEffect(() => {
    if (!packId) return
    dispatch(setCardTC({ cardsPack_id: packId }))
  }, [packId])

  const [sortInfo, setSortInfo] = useState<SortInfoType>({
    sortBy: null,
  })

  const educationCardList = (id: string) => {
    dispatch(setCardTC({ cardsPack_id: id }))
  }

  const deleteCard = (id: string) => {
    console.log(id)
  }
  const updateCard = (data: any) => {
    console.log(data)
  }

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

  const addCard = () => {
    dispatch(addCardTC({ card: { cardsPack_id: packId!, question: '123' } }))
  }

  return (
    <div className={styles.listWrapper}>
      <BackToPackList />
      <div className={styles.folder}>
        <div className={styles.myPackWrapper}>
          <h2>My Pack</h2>
          <div className={styles.editMyPack} onClick={() => setShowAction(!showAction)}>
            <div className={styles.spanWrapper}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            {/* T O D O   T O D O   T O D O*/}
            {/*ActionButtonsContainer ИД чего нужно? какой юзерИД нужен и прочая информация, может она не обязательна?*/}
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
      <div className={styles.interfaceField}>
        <div className={styles.search}>
          <span>Search</span>
          <div>
            <img src={searchIcon} alt="search icon" />
            <SuperDebouncedInput placeholder="Provide your text" />
          </div>
        </div>
      </div>

      <SuperTable columns={columns} data={cardPacks} onClick={onClickHandler} disabled={isDisable} sortBy={sortInfo.sortBy} />
    </div>
  )
}
