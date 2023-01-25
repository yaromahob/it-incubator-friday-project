import React from 'react'
import styles from './EmptyPack.module.scss'
import SuperButton from '../../../common/SuperButton/SuperButton'
import { addPackTC } from '../PackList-reducer'
import { useAppDispatch } from '../../../App/store'
import { BackToPackList } from '../../BackToPackList/BackToPackList'

export const EmptyPack: React.FC<EmptyPackType> = ({ callback }) => {
  return (
    <div>
      <div className={styles.pack}>
        <BackToPackList />
        <h2>Name Pack</h2>
      </div>

      <div className={styles.main}>
        <div>This pack is empty. Click add new card to fill this pack</div>
        <SuperButton onClick={callback}>Add new pack</SuperButton>
      </div>
    </div>
  )
}

type EmptyPackType = {
  callback?: () => void
}
