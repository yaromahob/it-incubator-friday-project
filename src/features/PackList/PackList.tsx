import React, { useEffect, useState } from 'react'
import SuperPagination from '../../common/SuperPagination/SuperPagination'
import SuperDebouncedInput from '../../common/SuperDebouncedInput/SuperDebouncedInput'
import styles from './PackList.module.scss'
import SuperRange from '../../common/SuperRange/SuperRange'
import clearFilterIcon from '../../assets/svg/clearFilters.svg'
import searchIcon from '../../assets/svg/search.svg'
import SuperButton from '../../common/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { getPacksTC } from './packList-reducer'
import { SuperTable } from '../../common/SuperTable/SuperTable'

const titles = ['Name', 'Cards', 'Last Updated', 'Created by', 'Actions']

export const PackList = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(state => state.packsList)
  const cardPacks = useAppSelector(state => state.packsList.cardPacks)
  const cardPacksTotalCount = useAppSelector(state => state.packsList.cardPacksTotalCount)
  const maxCardsCount = useAppSelector(state => state.packsList.maxCardsCount)
  const minCardsCount = useAppSelector(state => state.packsList.minCardsCount)
  const page = useAppSelector(state => state.packsList.page)
  const pageCount = useAppSelector(state => state.packsList.pageCount)
  const [allActive, setAllActive] = useState(true)
  const [ascActive, setAscActive] = useState(true)
  const [rangeValue1, setRangeValue1] = useState(1)
  const [rangeValue2, setRangeValue2] = useState(10)
  console.log(data)
  useEffect(() => {
    dispatch(getPacksTC())
  }, [])

  const allActiveHandler = (value: boolean) => {
    setAllActive(value)
    console.log(data)
  }
  const askActiveHandler = (value: boolean) => {
    setAscActive(value)
  }
  const changeItemOnPageHandler = (event: Event, value: number | number[]) => {
    if (typeof value === 'object') {
      setRangeValue2(value[1])
      setRangeValue1(value[0])
    }
  }
  return (
    <div className={styles.packListWrapper}>
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
            <input
              type="text"
              value="My"
              readOnly
              className={!allActive ? styles.active : ''}
              onClick={() => allActiveHandler(false)}
            />
            <input
              type="text"
              value="All"
              readOnly
              className={allActive ? styles.active : ''}
              onClick={() => allActiveHandler(true)}
            />
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
              <SuperRange
                value={[rangeValue1, rangeValue2]}
                min={1}
                max={10}
                step={1}
                onChange={changeItemOnPageHandler}
              />
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
      <SuperTable
        titles={titles}
        data={cardPacks}
        isAscSort={ascActive}
        ascActiveHandler={askActiveHandler}
      />
      <SuperPagination
        page={1}
        itemsCountForPage={10}
        totalCount={100}
        onChange={() => console.log('')}
      />
    </div>
  )
}


