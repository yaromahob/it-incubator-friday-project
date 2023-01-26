import React from 'react'
import styles from './BackToPackList.module.scss'
import arrow from '../../assets/svg/profile/arrow.svg'
import { NavLink } from 'react-router-dom'

export const BackToPackList = () => {
  return (
    <div className={styles.arrow}>
      <img src={arrow} alt="arrow icon" />
      <NavLink to={'/packList'}>Back to Packs List</NavLink>
    </div>
  )
}
