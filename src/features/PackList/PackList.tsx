import React, { useEffect } from 'react'
import SuperDebouncedInput from '../../common/SuperDebouncedInput/SuperDebouncedInput'
import styles from './PackList.module.scss'
import clearFilterIcon from '../../assets/svg/clearFilters.svg'
import searchIcon from '../../assets/svg/search.svg'
import SuperButton from '../../common/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { SuperTable } from '../../common/SuperTable/SuperTable'
import { ActionButtonsContainer } from '../../common/ActionButtonsContainer/ActionButtonsContainer'
import { addPackTC, clearFilterTC, deletePackTC, searchTextAC, setPackTC, sortByDateAC, updatePackTC } from './PackList-reducer'
import { PackType, UpdatePackType } from '../../api/api-packsList'
import { CardsCount } from './CardsCount/CardsCount'
import { AllCards } from './AllCards/AllCards'
import { SuperPagination } from '../../common/SuperPagination/SuperPagination'
import { setCardTC } from '../CardList/Card-reducer'
import { Navigate } from 'react-router-dom'

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
          <ActionButtonsContainer
            cardsCount={card.cardsCount}
            id={card._id}
            userId={card.user_id}
            educationsAction={setCards}
            editAction={updatePack}
            deleteAction={deletePack}
          />
        )
      },
    },
  ]

  const dispatch = useAppDispatch()
  const page = useAppSelector(state => state.packList.page)
  const pageCount = useAppSelector(state => state.packList.pageCount)
  const cardPacksTotalCount = useAppSelector(state => state.packList.cardPacksTotalCount)
  const isAuth = useAppSelector(state => state.app.isAuth)
  const packCards = useAppSelector(state => state.packList.cardPacks)
  const isDisable = useAppSelector(state => state.packList.isDisabled)
  const sortBy = useAppSelector(state => state.packList.sortBy)
  // const profileID = useAppSelector(state => state.profile._id)
  // const packCardsID = useAppSelector(state => state.cardList.cards)
  const setIsLoggedInCards = useAppSelector(state => state.cardList.setIsLoggedInCards)
  const showCurrentPage = (currentPage: number, itemsCount: number) => {
    dispatch(setPackTC({ page: currentPage, pageCount: itemsCount }))
  }
  const clearFilter = () => {
    dispatch(clearFilterTC())
  }
  const onClickHandler = () => {
    if (sortBy === DESC) {
      dispatch(setPackTC({ sortPacks: '0updated' }))
      dispatch(sortByDateAC(ASC))
    }
    if (sortBy === ASC) {
      dispatch(setPackTC({ sortPacks: '1updated' }))
      dispatch(sortByDateAC(DESC))
    }
  }

  const addPack = () => {
    dispatch(addPackTC({ cardsPack: { name: 'h1 my name is', private: false } }))
  }

  const setCards = (id: string) => {
    dispatch(setCardTC({ cardsPack_id: id }))
  }

  const deletePack = (id: string) => {
    dispatch(deletePackTC(id))
  }
  const updatePack = (data: UpdatePackType) => {
    dispatch(updatePackTC(data))
  }

  const searchText = (value: string) => {
    dispatch(searchTextAC(value))
    dispatch(setPackTC({ packName: value }))
  }
  useEffect(() => {
    if (isAuth) dispatch(setPackTC())
  }, [isAuth])

  if (setIsLoggedInCards) {
    // if (profileID === packCardsID) {
    //   return <Navigate to={'/myPack'} />
    // }
    return <Navigate to={'/cardList'} />
  }
  if (cardPacksTotalCount === 0) {
    dispatch(setPackTC({ packName: '' }))
    return <Navigate to={'/emptyPack'} />
  }
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
            <SuperDebouncedInput placeholder="Provide your text" onDebouncedChange={searchText} disabled={isDisable} />
          </div>
        </div>
        <AllCards />
        <CardsCount />
        <div className={styles.clearFilters}>
          <span></span>
          <button onClick={clearFilter} disabled={isDisable}>
            <img src={clearFilterIcon} alt="button img" />
          </button>
        </div>
      </div>
      <SuperTable columns={columns} data={packCards} onClick={onClickHandler} sortBy={sortBy} disabled={isDisable} />
      <SuperPagination
        page={page}
        itemsCountForPage={pageCount}
        totalCount={cardPacksTotalCount}
        onChange={showCurrentPage}
        disabled={isDisable}
      />
    </div>
  )
}

// types

export type SortInfoType = { sortBy: null | string }
