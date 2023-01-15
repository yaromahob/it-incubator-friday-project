import React, { useEffect, useState } from 'react'
import SuperPagination from '../../common/SuperPagination/SuperPagination'
import SuperDebouncedInput from '../../common/SuperDebouncedInput/SuperDebouncedInput'
import styles from './PackList.module.scss'
import SuperRange from '../../common/SuperRange/SuperRange'
import clearFilterIcon from '../../assets/svg/clearFilters.svg'
import searchIcon from '../../assets/svg/search.svg'
import SuperButton from '../../common/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { SuperTable } from '../../common/SuperTable/SuperTable'
import { ActionButtonsContainer } from '../../common/ActionButtonsContainer/ActionButtonsContainer'
import { setPackTC } from './PackList-reducer'
import { PackType } from '../Pack'

const columns = [
  { key: 'name', name: 'Name' },
  { key: 'cardsCount', name: 'Cards' },
  { key: 'updated', name: 'Last Updated' },
  { key: 'user_name', name: 'Created by' },
  {
    key: 'actions',
    name: 'Actions',
    render: (card: PackType) => {
      return <ActionButtonsContainer educationsAction={() => alert()} editAction={() => alert()} deleteAction={() => alert()} />
    },
  },
]

const ASC = '0'
const DESC = '1'

export const PackList = () => {
  const dispatch = useAppDispatch()
  const packCards = useAppSelector(state => state.packList.cardPacks)
  const [allActive, setAllActive] = useState(true)
  const userId = useAppSelector(state => state.profile._id)
  const [sortInfo, setSortInfo] = useState<SortInfoType>({
    field: null,
    sortBy: null,
  })
  const [rangeValue1, setRangeValue1] = useState(1)
  const [rangeValue2, setRangeValue2] = useState(10)
  useEffect(() => {
    dispatch(setPackTC({ user_id: userId, block: false }))
  }, [userId])

  const allActiveHandler = (value: boolean) => {
    setAllActive(value)
  }
  const changeItemOnPageHandler = (event: Event, value: number | number[]) => {
    if (typeof value === 'object') {
      setRangeValue2(value[1])
      setRangeValue1(value[0])
    }
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
      <div className={styles.folder}>
        <h2>Packs list</h2>
        <SuperButton>Add new pack</SuperButton>
      </div>
      <div className={styles.interfaceField}>
        <div className={styles.search}>
          <span>Search</span>
          <div>
            <img src={searchIcon} alt="search icon" />
            <SuperDebouncedInput placeholder="Provide your text" />
          </div>
        </div>
        <div className={styles.showPacks}>
          <span>Show packs cards</span>
          <div className={styles.selectOne}>
            <input type="text" value="My" readOnly className={!allActive ? styles.active : ''} onClick={() => allActiveHandler(false)} />
            <input type="text" value="All" readOnly className={allActive ? styles.active : ''} onClick={() => allActiveHandler(true)} />
          </div>
        </div>
        <div className={styles.cardsView}>
          <span>Number of cards</span>
          <div className={styles.inputWrapper}>
            <div className={styles.showNumber}>
              <div>
                <input type="text" value={rangeValue1} readOnly />
              </div>
            </div>
            <div className={styles.rangeWrapper}>
              <SuperRange value={[rangeValue1, rangeValue2]} min={1} max={10} step={1} onChange={changeItemOnPageHandler} />
            </div>
            <div className={styles.showNumber}>
              <div>
                <input type="text" value={rangeValue2} readOnly />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.clearFilters}>
          <span></span>
          <button>
            <img src={clearFilterIcon} alt="button img" />
          </button>
        </div>
      </div>
      <SuperTable columns={columns} data={packCards} onClick={onClickHandler} sortField={sortInfo.field} sortBy={sortInfo.sortBy} />
      <SuperPagination page={1} itemsCountForPage={10} totalCount={100} onChange={() => console.log('')} />
    </div>
  )
}

// types

export type SortInfoType = { field: null | string; sortBy: null | string }
