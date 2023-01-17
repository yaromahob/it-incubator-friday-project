import React, { useEffect, useState } from 'react'
import SuperDebouncedInput from '../../common/SuperDebouncedInput/SuperDebouncedInput'
import styles from './PackList.module.scss'
import clearFilterIcon from '../../assets/svg/clearFilters.svg'
import searchIcon from '../../assets/svg/search.svg'
import SuperButton from '../../common/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { SuperTable } from '../../common/SuperTable/SuperTable'
import { ActionButtonsContainer } from '../../common/ActionButtonsContainer/ActionButtonsContainer'
import { addPackTC, deletePackTC, setPackTC } from './PackList-reducer'
import { PackType } from '../../api/api-packsList'
import { CardsCount } from './CardsCount/CardsCount'
import { AllCards } from './AllCards/AllCards'
import { SuperPagination } from '../../common/SuperPagination/SuperPagination'

const ASC = '0'
const DESC = '1'

export const PackList = () => {
  const columns = [
    { key: 'name', name: 'Name' },
    { key: 'cardsCount', name: 'Cards' },
    { key: 'updated', name: 'Last Updated' },
    { key: 'user_name', name: 'Created by' },
    {
      key: 'actions',
      name: 'Actions',
      render: (card: PackType) => {
        return (
          <ActionButtonsContainer id={card._id} educationsAction={() => alert()} editAction={() => alert()} deleteAction={deletePack} />
        )
      },
    },
  ]

  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.packList.page)
  const pageCount = useAppSelector(state => state.packList.pageCount)
  const totalCount = useAppSelector(state => state.packList.cardPacksTotalCount)
  const isAuth = useAppSelector(state => state.app.isAuth)
  const packCards = useAppSelector(state => state.packList.cardPacks)
  const isDisable = useAppSelector(state => state.packList.isDisabled)

  const [sortInfo, setSortInfo] = useState<SortInfoType>({
    field: null,
    sortBy: null,
  })

  const showCurrentPage = (currentPage: number, itemsCount: number) => {
    dispatch(setPackTC({ page: currentPage, pageCount: itemsCount }))
  }

  const onClickHandler = (field: string) => {
    if (sortInfo.sortBy === DESC) {
      dispatch(setPackTC({ sortPacks: '1updated' }))
      setSortInfo({ field, sortBy: ASC })
    } else {
      setSortInfo(prev => ({ field, sortBy: prev.sortBy === null ? ASC : DESC }))
    }
  }

  const addPack = () => {
    dispatch(addPackTC({ cardsPack: { name: 'h1 my name is', private: false } }))
  }

  const deletePack = (id: string) => {
    dispatch(deletePackTC(id))
  }

  useEffect(() => {
    if (isAuth) dispatch(setPackTC())
  }, [isAuth])

  return (
    <div className={styles.listWrapper}>
      <div className={styles.folder}>
        <h2>Packs list</h2>
        <SuperButton onClick={addPack}>Add new pack</SuperButton>
      </div>
      <div className={styles.interfaceField}>
        <div className={styles.search}>
          <span>Search</span>
          <div>
            <img src={searchIcon} alt="search icon" />
            <SuperDebouncedInput placeholder="Provide your text" />
          </div>
        </div>
        <AllCards />
        <CardsCount />
        <div className={styles.clearFilters}>
          <span></span>
          <button>
            <img src={clearFilterIcon} alt="button img" />
          </button>
        </div>
      </div>
      <SuperTable columns={columns} data={packCards} onClick={onClickHandler} sortField={sortInfo.field} sortBy={sortInfo.sortBy} />
      <SuperPagination page={page} itemsCountForPage={pageCount} totalCount={totalCount} onChange={showCurrentPage} disabled={isDisable} />
    </div>
  )
}

// types

export type SortInfoType = { field: null | string; sortBy: null | string }
