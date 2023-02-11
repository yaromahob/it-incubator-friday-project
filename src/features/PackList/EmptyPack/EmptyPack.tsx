import React from 'react'
import styles from './EmptyPack.module.scss'
import { SuperButton } from 'common/SuperButton'
import { BackToPackListWithoutRedirect } from '../../BackToPackList/BackToPackListWithoutRedirect'
import { AddNewPack } from '../../PackCardCRUD/AddNewPack'
import { deckCoverForAddAC, setOpenModalNewPackAC, textNewPackAC } from '../PackList-reducer'
import { useAppDispatch } from '../../../App/store'

export const EmptyPack = () => {
  const dispatch = useAppDispatch()

  const addPack = () => {
    dispatch(textNewPackAC(''))
    dispatch(deckCoverForAddAC(''))
    dispatch(setOpenModalNewPackAC(true))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.pack}>
        <BackToPackListWithoutRedirect />
        <h2>Name Pack</h2>
      </div>

      <div className={styles.main}>
        <div>This pack is empty. Click add new card to fill this pack</div>
        <SuperButton onClick={addPack}>Add new pack</SuperButton>
      </div>
      <AddNewPack />
    </div>
  )
}
