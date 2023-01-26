import React, { ChangeEvent } from 'react'
import styles from './EditOrAddCard.module.scss'
import SuperSelect from '../../SuperSelect/SuperSelect'
import SuperInputText from '../../SuperInputText/SuperInputText'

const names = [
  { id: 1, value: 'Text' },
  { id: 2, value: 'Video' },
]

export const EditOrAddCard: React.FC<EditOrAddCardType> = ({ question, answer, questionCallback, answerCallback }) => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.chooseFormat}>
        <span>Choose a question format</span>
        <SuperSelect options={names} />
      </div>
      <div className={styles.questionOrAnswer}>
        <label>
          Question
          <SuperInputText value={question} onChange={questionCallback} />
        </label>
        <label>
          Answer
          <SuperInputText value={answer} onChange={answerCallback} />
        </label>
      </div>
    </div>
  )
}

type EditOrAddCardType = {
  question: string
  answer: string
  questionCallback: (e: ChangeEvent<HTMLInputElement>) => void
  answerCallback: (e: ChangeEvent<HTMLInputElement>) => void
}
