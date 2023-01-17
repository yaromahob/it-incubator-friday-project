import React, { useEffect, useState } from 'react'
import styles from '../PackList.module.scss'
import SuperRange from '../../../common/SuperRange/SuperRange'
import { useAppDispatch, useAppSelector } from '../../../App/store'
import { setCardsCountAC, setPackTC } from '../PackList-reducer'

export const CardsCount = () => {
  const dispatch = useAppDispatch()
  const minCardsCount = useAppSelector(state => state.packList.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packList.maxCardsCount)
  const cardsCount = useAppSelector(state => state.packList.cardsCount)
  const isDisable = useAppSelector(state => state.packList.isDisabled)
  const isAuth = useAppSelector(state => state.app.isAuth)
  const changeItemOnPageHandler = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      dispatch(setCardsCountAC(value))
    }
  }
  useEffect(() => {
    if (isAuth) {
      const getData = setTimeout(() => {
        dispatch(setPackTC({ min: cardsCount[0], max: cardsCount[1] }))
      }, 500)
      return () => clearTimeout(getData)
    }
  }, [cardsCount])

  return (
    <div className={styles.cardsView}>
      <span>Number of cards</span>
      <div className={styles.inputWrapper}>
        <div className={styles.showNumber}>
          <div>
            <input type="text" value={cardsCount[0]} readOnly />
          </div>
        </div>
        <div className={styles.rangeWrapper}>
          <SuperRange
            value={[cardsCount[0], cardsCount[1]]}
            min={minCardsCount}
            max={maxCardsCount}
            step={1}
            onChange={changeItemOnPageHandler}
            disabled={isDisable}
          />
        </div>
        <div className={styles.showNumber}>
          <div>
            <input type="text" value={cardsCount[1]} readOnly />
          </div>
        </div>
      </div>
    </div>
  )
}
