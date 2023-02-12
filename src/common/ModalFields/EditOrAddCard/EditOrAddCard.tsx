import React, { ChangeEvent, useState } from 'react'
import styles from './EditOrAddCard.module.scss'
import { SuperSelect } from '../../SuperSelect'
import { SuperInputText } from '../../SuperInputText'
import { InputUploadCover } from '../../UploadCover'

const names = [
  { id: 1, value: 'Text' },
  { id: 2, value: 'Feature' },
]

export const EditOrAddCard: React.FC<EditOrAddCardType> = ({
  questionImgCallback,
  answerImgCallback,
  question,
  answer,
  questionCallback,
  answerCallback,
  CardQuestionHandler,
  CardAnswerHandler,
}) => {
  const [value, setValue] = useState(1)
  const test = (e: any) => {
    setValue(e)
  }

  console.log('rerender')
  return (
    <div className={styles.formWrapper}>
      <div className={styles.chooseFormat}>
        <span>Choose a question format</span>
        <SuperSelect options={names} onChangeOption={test} />
      </div>
      {value === 1 ? (
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
      ) : (
        <div className={styles.imageQuestionWrapper}>
          <div>
            <label className={styles.uploadCover} title={'use an image with a maximum 200х120px'}>
              Upload question cover
              <InputUploadCover callback={CardQuestionHandler} />
            </label>
            <img src={questionImgCallback} alt="questionImg" />
          </div>
          <div>
            <label className={styles.uploadCover} title={'use an image with a maximum  200х120px'}>
              Upload answer cover
              <InputUploadCover callback={CardAnswerHandler} />
            </label>
            <img src={answerImgCallback} alt="answerImg" />
          </div>
        </div>
      )}
    </div>
  )
}

type EditOrAddCardType = {
  questionImgCallback: string
  answerImgCallback: string
  question: string
  answer: string
  questionCallback: (e: ChangeEvent<HTMLInputElement>) => void
  answerCallback: (e: ChangeEvent<HTMLInputElement>) => void
  CardQuestionHandler: (v: string) => void
  CardAnswerHandler: (v: string) => void
}
