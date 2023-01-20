import React from 'react'
import styles from '../PackList.module.scss'
import SuperButton from '../../../common/SuperButton/SuperButton'
import { addPackTC } from '../PackList-reducer'
import { useAppDispatch } from '../../../App/store'

export const EmptyPack = () => {
  const dispatch = useAppDispatch()
  const addPack = () => {
    dispatch(addPackTC({ cardsPack: { name: 'My name is Inna na-na-na', private: false } }))
  }
  return (
    <div>
      <div className={styles.folder}>
        <h2>Name Pack</h2>
        <SuperButton onClick={addPack}>Add new pack</SuperButton>
      </div>
    </div>
  )
}
