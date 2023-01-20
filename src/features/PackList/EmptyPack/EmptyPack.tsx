import React from 'react'
import styles from './EmptyPack.module.scss'
import SuperButton from '../../../common/SuperButton/SuperButton'
import { addPackTC } from '../PackList-reducer'
import { useAppDispatch } from '../../../App/store'
import { BackToPackList } from '../../BackToPackList/BackToPackList'

export const EmptyPack = () => {
  const dispatch = useAppDispatch()
  const addPack = () => {
    dispatch(addPackTC({ cardsPack: { name: 'My name is Inna na-na-na', private: false } }))
  }
  return (
    <div>
      <div className={styles.pack}>
        <BackToPackList />
        <h2>Name Pack</h2>
      </div>

      <div className={styles.main}>
        <div>This pack is empty. Click add new card to fill this pack</div>
        <SuperButton onClick={addPack}>Add new pack</SuperButton>
      </div>
    </div>
  )
}
