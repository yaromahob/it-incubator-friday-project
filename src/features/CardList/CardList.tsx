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
  const isAuth = useAppSelector(state => state.app.isAuth)
  const cardPacks = useAppSelector(state => state.cardList.cards)
  const [sortInfo, setSortInfo] = useState<SortInfoType>({
    field: null,
    sortBy: null,
  })

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

      <SuperTable columns={columns2} data={cardPacks} onClick={onClickHandler} sortField={sortInfo.field} sortBy={sortInfo.sortBy} />
    </div>
  )
}
