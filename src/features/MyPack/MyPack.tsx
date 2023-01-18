import React, { useState } from 'react'
import { SuperTable } from '../../common/SuperTable/SuperTable'
import { SortInfoType } from '../PackList/PackList'
import { useAppDispatch, useAppSelector } from '../../App/store'
import styles from './MyPack.module.scss'
import SuperButton from '../../common/SuperButton/SuperButton'
import searchIcon from '../../assets/svg/search.svg'
import SuperDebouncedInput from '../../common/SuperDebouncedInput/SuperDebouncedInput'
import { Grade } from '../../common/Grade/Grade'
import { PackType, UpdatePackType } from '../../api/api-packsList'
import { ActionButtonsContainer } from '../../common/ActionButtonsContainer/ActionButtonsContainer'
import { deletePackTC, updatePackTC } from '../PackList/PackList-reducer'
import { BackToPackList } from '../BackToPackList/BackToPackList'
import { setCardTC } from '../CardList/Card-reducer'

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
  const [showAction, setShowAction] = useState(false)
  const [sortInfo, setSortInfo] = useState<SortInfoType>({
    field: null,
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

  const onClickHandler = (field: string) => {
    console.log(field)
    if (sortInfo.sortBy === DESC) {
      setSortInfo({ field, sortBy: null })
    } else {
      setSortInfo(prev => ({ field, sortBy: prev.sortBy === null ? ASC : DESC }))
    }
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
                  id={''}
                  userId={''}
                  cardsCount={5}
                  deleteAction={deleteCard}
                  editAction={updateCard}
                  educationsAction={educationCardList}
                />
              </div>
            )}
          </div>
        </div>
        <SuperButton>Add new card</SuperButton>
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

      <SuperTable columns={columns} data={cardPacks} onClick={onClickHandler} sortField={sortInfo.field} sortBy={sortInfo.sortBy} />
    </div>
  )
}
