import React from 'react'
import styles from './BackToPackList.module.scss'
import arrow from '../../assets/svg/profile/arrow.svg'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../root'

export const BackToPackList = () => {
  return (
    <div className={styles.arrow}>
      <img src={arrow} alt="arrow icon" />
      <NavLink to={PATH.PACK_LIST}>Back to Packs List</NavLink>
    </div>
  )
}
