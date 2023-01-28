import React from 'react'
import { useAppDispatch } from '../../App/store'
import { setPackTC } from '../PackList/PackList-reducer'
import styles from './BackToPackList.module.scss'
import arrow from '../../assets/svg/profile/arrow.svg'

export const BackToPackListWithoutRedirect = () => {
  const dispatch = useAppDispatch()

  const backToDefault = () => {
    dispatch(setPackTC())
  }

  return (
    <div className={styles.arrow} onClick={backToDefault}>
      <img src={arrow} alt="arrow icon" />
      <span>Back to Packs List</span>
    </div>
  )
}
