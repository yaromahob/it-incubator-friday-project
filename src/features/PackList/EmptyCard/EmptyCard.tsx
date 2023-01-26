import React from 'react'
import styles from './EmptyCard.module.scss'
import SuperButton from '../../../common/SuperButton/SuperButton'

import { useAppDispatch } from '../../../App/store'
import { BackToPackList } from '../../BackToPackList/BackToPackList'
import { addCardTC } from '../../CardList/Card-reducer'
import { useParams } from 'react-router-dom'

export const EmptyCard = () => {
  const dispatch = useAppDispatch()
  const { idPack } = useParams()
  const addCard = () => {
    dispatch(addCardTC({ card: { cardsPack_id: idPack! } }))
  }
  return (
    <div>
      <div className={styles.pack}>
        <BackToPackList />
        <h2>Name Card</h2>
      </div>

      <div className={styles.main}>
        <div>This cards is empty. Click add new card to fill this pack</div>
        <SuperButton onClick={addCard}>Add new card</SuperButton>
      </div>
    </div>
  )
}
