import React, { useEffect } from 'react'
import { SuperDebouncedInput } from 'common/SuperDebouncedInput'
import styles from './PackList.module.scss'
import clearFilterIcon from '../../assets/svg/clearFilters.svg'
import searchIcon from '../../assets/svg/search.svg'
import SuperButton from '../../common/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { SuperTable } from 'common/SuperTable/SuperTable'
import { ActionButtonsContainer } from 'common/ActionButtonsContainer'
import {
  clearFilterTC,
  deckCoverForAddAC,
  idEditPackAC,
  searchTextAC,
  setOpenModalDeletePackAC,
  setOpenModalEditPackAC,
  setOpenModalNewPackAC,
  setPackTC,
  sortByDateAC,
  textNewPackAC,
} from './PackList-reducer'
import { PackType } from '../../api/api-packsList'
import { CardsCount } from './CardsCount/CardsCount'
import { AllCards } from './AllCards/AllCards'
import { SuperPagination } from 'common/SuperPagination'
import { Navigate, NavLink } from 'react-router-dom'
import { EditPack } from '../PackCardCRUD/EditPack'
import { PATH } from '../../root'
import { AddNewPack } from '../PackCardCRUD/AddNewPack'
import { DeletePack } from '../PackCardCRUD/DeletePack'
import { EmptyPack } from './EmptyPack/EmptyPack'
import noImage from '../../assets/svg/no_image_available.svg'

const ASC = '0'
const DESC = '1'

export const PackList = () => {
  const profileID = useAppSelector(state => state.profile._id)
  const columns = [
    {
      key: 'cover',
      name: 'Cover',
      deckCover: (card: PackType) => {
        return <img src={card.deckCover ? card.deckCover : noImage} alt="card cover" />
      },
    },
    {
      key: 'name',
      name: 'Name',
      render: (card: PackType) => {
        if (card.user_id === profileID && card.cardsCount === 0) {
          return <NavLink to={`${PATH.EMPTY_CARD}/${card.user_id}/${card._id}`}> {card.name} </NavLink>
        }

        if (card.cardsCount === 0 && card.user_id !== profileID) {
          return <span>{card.name}</span>
        }

        return <NavLink to={`${PATH.CARD_LIST}/${card.user_id}/${card._id}`}> {card.name} </NavLink>
      },
    },
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
            packName={card.name}
            deckCover={card.deckCover}
            educationsAction={() => {}}
            editAction={editPack}
            deleteAction={deletePack}
          />
        )
      },
    },
  ]

  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.app.isAuth)
  const { page, pageCount, cardPacksTotalCount, cardPacks, isDisabled, sortBy, textNewPack, userId, deckCoverForAdd } = useAppSelector(
    state => state.packList
  )

  const showCurrentPage = (currentPage: number, itemsCount: number) => {
    userId && dispatch(setPackTC({ user_id: userId, page: currentPage, pageCount: itemsCount }))
    !userId && dispatch(setPackTC({ page: currentPage, pageCount: itemsCount }))
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
    dispatch(textNewPackAC(''))
    dispatch(deckCoverForAddAC(''))
    dispatch(setOpenModalNewPackAC(true))
  }

  const deletePack = (id: string, packName: string) => {
    dispatch(setOpenModalDeletePackAC(true))
    dispatch(textNewPackAC(packName))
    dispatch(idEditPackAC(id))
  }

  const editPack = (id: string, packName: string, _: string | undefined, deckCover: string | undefined) => {
    dispatch(textNewPackAC(packName))
    deckCover && dispatch(deckCoverForAddAC(deckCover))
    dispatch(idEditPackAC(id))
    dispatch(setOpenModalEditPackAC(true))
  }

  const searchText = (value: string) => {
    dispatch(searchTextAC(value))
    dispatch(setPackTC({ packName: value }))
  }

  useEffect(() => {
    if (isAuth && !userId) dispatch(setPackTC())
    if (userId) dispatch(setPackTC({ user_id: userId }))
  }, [isAuth])

  if (!isAuth) <Navigate to={PATH.LOGIN} />
  return (
    <div className={styles.listWrapper}>
      {cardPacksTotalCount ? (
        <div>
          <div className={styles.folder}>
            <h2>Packs list</h2>
            <SuperButton onClick={addPack}>Add new pack</SuperButton>
          </div>
          <div className={styles.interfaceField}>
            <div className={styles.search}>
              <span>Search</span>
              <div>
                <img src={searchIcon} alt="search icon" />
                <SuperDebouncedInput placeholder="Provide your text" onDebouncedChange={searchText} disabled={isDisabled} />
              </div>
            </div>
            <AllCards />
            <CardsCount />
            <div className={styles.clearFilters}>
              <span></span>
              <button onClick={clearFilter} disabled={isDisabled}>
                <img src={clearFilterIcon} alt="button img" />
              </button>
            </div>
          </div>
          <SuperTable columns={columns} data={cardPacks} onClick={onClickHandler} sortBy={sortBy} disabled={isDisabled} />
          <SuperPagination
            page={page}
            itemsCountForPage={pageCount}
            totalCount={cardPacksTotalCount}
            onChange={showCurrentPage}
            disabled={isDisabled}
          />
          <AddNewPack />
          <EditPack />
          <DeletePack nameItem={textNewPack} />
        </div>
      ) : (
        <EmptyPack callback={addPack} />
      )}
    </div>
  )
}

// types

export type SortInfoType = { sortBy: null | string }
