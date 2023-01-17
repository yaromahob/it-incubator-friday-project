import React, { useState } from 'react'
import styles from '../PackList.module.scss'
import { useAppDispatch, useAppSelector } from '../../../App/store'
import { setPackTC } from '../PackList-reducer'

export const AllCards = () => {
  const dispatch = useAppDispatch()
  const profileId = useAppSelector(state => state.profile._id)
  const isDisable = useAppSelector(state => state.packList.isDisabled)
  const [allActive, setAllActive] = useState(true)

  const allActiveHandler = (value: boolean) => {
    if (value) {
      dispatch(setPackTC({ user_id: '' }))
      setAllActive(value)
    } else {
      dispatch(setPackTC({ user_id: profileId }))
      setAllActive(value)
    }
  }

  return (
    <div className={styles.showPacks}>
      <span>Show packs cards</span>
      <div className={styles.selectOne}>
        <input
          type="text"
          value="My"
          readOnly
          className={!allActive ? styles.active : ''}
          disabled={isDisable}
          onClick={() => allActiveHandler(false)}
        />
        <input
          type="text"
          value="All"
          readOnly
          className={allActive ? styles.active : ''}
          disabled={isDisable}
          onClick={() => allActiveHandler(true)}
        />
      </div>
    </div>
  )
}
