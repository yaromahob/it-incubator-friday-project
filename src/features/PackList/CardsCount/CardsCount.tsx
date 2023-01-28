import React, { useEffect, useState } from 'react'
import styles from '../PackList.module.scss'
import SuperRange from '../../../common/SuperRange/SuperRange'
import { useAppDispatch, useAppSelector } from '../../../App/store'
import {  setPackTC } from '../PackList-reducer'

export const CardsCount = () => {
  const dispatch = useAppDispatch()
  const {minCardsCount, maxCardsCount, isDisabled, userId} = useAppSelector(state => state.packList)
  const [valueSearchCard, setValueSearchCard] = useState([minCardsCount, maxCardsCount])
  const changeItemOnPageHandler = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      setValueSearchCard(value)
    }
  }
  useEffect(() => {
      setValueSearchCard([minCardsCount, maxCardsCount])
  }, [minCardsCount, maxCardsCount])
  
  const changeHandler = () => {
    if(userId) {
      dispatch(setPackTC({ user_id: userId, min: valueSearchCard[0], max: valueSearchCard[1] }))
    } else dispatch(setPackTC({ min: valueSearchCard[0], max: valueSearchCard[1] }))
    
    
  };


  return (
    <div className={styles.cardsView}>
      <span>Number of cards</span>
      <div className={styles.inputWrapper}>
        <div className={styles.showNumber}>
          <div>
            <input type="text" value={valueSearchCard[0]} readOnly />
          </div>
        </div>
        <div className={styles.rangeWrapper}>
          <SuperRange
            value={[valueSearchCard[0], valueSearchCard[1]]}
            min={minCardsCount}
            max={maxCardsCount}
            step={1}
            onChange={changeItemOnPageHandler}
            onChangeCommitted={changeHandler}
            disabled={isDisabled}
          />
        </div>
        <div className={styles.showNumber}>
          <div>
            <input type="text" value={valueSearchCard[1]} readOnly />
          </div>
        </div>
      </div>
    </div>
  )
}
