import React, { useEffect, useState } from 'react'
import styles from '../PackList.module.scss'
import SuperRange from '../../../common/SuperRange/SuperRange'
import { useAppDispatch, useAppSelector } from '../../../App/store'
import { setPackTC } from '../PackList-reducer'
import { useDebounce } from '../../../common/utils/debounce'

export const CardsCount = () => {
  const dispatch = useAppDispatch()
  const minCardsCount = useAppSelector(state => state.packList.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packList.maxCardsCount)
  const isDisable = useAppSelector(state => state.packList.isDisabled)
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(30)
  const minDebounceValue = useDebounce(minValue, 800)
  const maxDebounceValue = useDebounce(maxValue, 800)
  const changeItemOnPageHandler = (event: Event, value: number | number[]) => {
    if (typeof value === 'object') {
      setMinValue(value[0])
      setMaxValue(value[1])
    }
  }
  useEffect(() => {
    if (minDebounceValue | maxDebounceValue) dispatch(setPackTC({ min: minDebounceValue, max: maxDebounceValue }))
  }, [minDebounceValue, maxDebounceValue])

  return (
    <div className={styles.cardsView}>
      <span>Number of cards</span>
      <div className={styles.inputWrapper}>
        <div className={styles.showNumber}>
          <div>
            <input type="text" value={minValue} readOnly />
          </div>
        </div>
        <div className={styles.rangeWrapper}>
          <SuperRange
            value={[minValue, maxValue]}
            min={minCardsCount}
            max={maxCardsCount}
            step={1}
            onChange={changeItemOnPageHandler}
            disabled={isDisable}
          />
        </div>
        <div className={styles.showNumber}>
          <div>
            <input type="text" value={maxValue} readOnly />
          </div>
        </div>
      </div>
    </div>
  )
}
