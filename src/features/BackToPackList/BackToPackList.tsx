import React from 'react'
import styles from './BackToPackList.module.scss'
import arrow from '../../assets/svg/profile/arrow.svg'
import { setIsLoggedInCardsAC } from '../CardList/Card-reducer'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../App/store'

export const BackToPackList = () => {
  const dispatch = useAppDispatch()

  const backToPack = () => {
    dispatch(setIsLoggedInCardsAC(false))
  }

  return (
    <div className={styles.arrow} onClick={backToPack}>
      <img src={arrow} alt="arrow icon" />
      <NavLink to={'/packList'}>Back to Packs List</NavLink>
    </div>
  )
}
