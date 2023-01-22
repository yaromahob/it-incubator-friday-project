import React from 'react'
import styles from './EditOrAddCard.module.scss'
import SuperSelect from '../../SuperSelect/SuperSelect'
import SuperInputText from '../../SuperInputText/SuperInputText'

const names = [
  { id: 1, value: 'Text' },
  { id: 2, value: 'Video' },
]

export const EditOrAddCard = () => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.chooseFormat}>
        <span>Choose a question format</span>
        <SuperSelect options={names} />
      </div>
      <div className={styles.questionOrAnswer}>
        <label>
          Question
          <SuperInputText value={'How "This" works in JavaScript?'} />
        </label>
        <label>
          Answer
          <SuperInputText value={'This is how "This" works in JavaScript'} />
        </label>
      </div>
    </div>
  )
}
