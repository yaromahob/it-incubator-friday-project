import React, { useState } from 'react'
import styles from '../PackList.module.scss'
import { useAppDispatch, useAppSelector } from '../../../App/store'
import { setPackTC, setUserIdAC } from '../PackList-reducer'

export const AllCards = () => {
  const dispatch = useAppDispatch()
  const profileId = useAppSelector(state => state.profile._id)
  const isDisable = useAppSelector(state => state.packList.isDisabled)
  const cardsCount = useAppSelector(state => state.packList.cardsCount)
  const userId = useAppSelector(state => state.packList.userId)

  const allActiveHandler = () => {
    dispatch(setPackTC({ user_id: '', min: cardsCount[0], max: cardsCount[1] }))
    dispatch(setUserIdAC(''))
  }

  const myActiveHandler = () => {
    dispatch(setPackTC({ user_id: profileId }))
    dispatch(setUserIdAC(profileId))
  }

  return (
    <div className={styles.showPacks}>
      <span>Show packs cards</span>
      <div className={styles.selectOne}>
        <input type="text" value="My" readOnly className={userId ? styles.active : ''} disabled={isDisable} onClick={myActiveHandler} />
        <input type="text" value="All" readOnly className={!userId ? styles.active : ''} disabled={isDisable} onClick={allActiveHandler} />
      </div>
    </div>
  )
}
