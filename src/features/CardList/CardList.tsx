import React, { useEffect, useState } from 'react'
import { SuperTable } from '../../common/SuperTable/SuperTable'
import { SortInfoType } from '../PackList/PackList'
import { useAppDispatch, useAppSelector } from '../../App/store'
import styles from './CardList.module.scss'
import SuperButton from '../../common/SuperButton/SuperButton'
import searchIcon from '../../assets/svg/search.svg'
import SuperDebouncedInput from '../../common/SuperDebouncedInput/SuperDebouncedInput'
import { Grade } from '../../common/Grade/Grade'
import { PackType } from '../../api/api-packsList'
import { setCardTC } from './Card-reducer'
import { setPackTC } from '../PackList/PackList-reducer'
import { Navigate, NavLink } from 'react-router-dom'
import style from '../Profile/Profile.module.scss'
import arrow from '../../assets/svg/profile/arrow.svg'
import { BackToPackList } from '../BackToPackList/BackToPackList'

const columns2 = [
  { key: 'question', name: 'Question' },
  { key: 'answer', name: 'Answer' },
  { key: 'updated', name: 'Last Updated' },
  {
    key: 'grade',
    name: 'Grade',
    render: (card: PackType) => {
      return <Grade id={card._id} />
    },
  },
]

const ASC = '0'
const DESC = '1'

export const CardList = () => {
  const dispatch = useAppDispatch()
  const setIsLoggedInCards = useAppSelector(state => state.cardList.setIsLoggedInCards)
  const cardPacks = useAppSelector(state => state.cardList.cards)
  const profileID = useAppSelector(state => state.profile._id)
  const isDisable = useAppSelector(state => state.packList.isDisabled)

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

  return (
    <div className={styles.listWrapper}>
      <BackToPackList />
      <div className={styles.folder}>
        <h2>Friend’s Pack</h2>
        <SuperButton>Learn to pack</SuperButton>
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

      <SuperTable columns={columns2} data={cardPacks} onClick={onClickHandler} sortBy={sortInfo.sortBy} disabled={isDisable} />
    </div>
  )
}
