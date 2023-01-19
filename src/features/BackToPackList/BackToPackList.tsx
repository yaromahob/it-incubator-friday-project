import React from 'react'
import styles from './BackToPackList.module.scss'
import arrow from '../../assets/svg/profile/arrow.svg'
import { setIsLoggedInCardsAC } from '../CardList/Card-reducer'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../App/store'

export const BackToPackList = () => {
  const dispatch = useAppDispatch()
  const setIsLoggedInCards = useAppSelector(state => state.cardList.setIsLoggedInCards)

  const backToPack = () => {
    dispatch(setIsLoggedInCardsAC(false))
  }

  if (!setIsLoggedInCards) {
    return <Navigate to={'/packList'} />
  }

  return (
    <div className={styles.arrow} onClick={backToPack}>
      <img src={arrow} alt="arrow icon" />
      <span>Back to Packs List</span>
    </div>
  )
}

type BackToPackListType = {
  backToPack: () => void
}
