import React, { ChangeEvent, useState } from 'react'
import styles from './EditOrAddCard.module.scss'
import SuperSelect from '../../SuperSelect/SuperSelect'
import SuperInputText from '../../SuperInputText/SuperInputText'
import { InputUploadCover } from '../../UploadCover/UploadCover'
import { useAppDispatch } from '../../../App/store'
import { addCardAnswerImgAC, addCardQuestionImgAC } from '../../../features/CardList/Card-reducer'

const names = [
  { id: 1, value: 'Text' },
  { id: 2, value: 'Feature' },
]

export const EditOrAddCard: React.FC<EditOrAddCardType> = ({ question, answer, questionCallback, answerCallback }) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState(1)
  const test = (e: any) => {
    setValue(e)
  }
  const addCardQuestionHandler = (v: string) => {
    dispatch(addCardQuestionImgAC(v))
  }
  const addCardAnswerHandler = (v: string) => {
    dispatch(addCardAnswerImgAC(v))
  }
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
              <InputUploadCover callback={addCardQuestionHandler} />
            </label>
            <img src="https://rdironworks.com/wp-content/uploads/2017/12/dummy-200x200.png" alt="questionImg" />
          </div>
          <div>
            <label className={styles.uploadCover} title={'use an image with a maximum  200х120px'}>
              Upload answer cover
              <InputUploadCover callback={addCardAnswerHandler} />
            </label>
            <img src="https://rdironworks.com/wp-content/uploads/2017/12/dummy-200x200.png" alt="answerImg" />
          </div>
        </div>
      )}
    </div>
  )
}

type EditOrAddCardType = {
  question: string
  answer: string
  questionCallback: (e: ChangeEvent<HTMLInputElement>) => void
  answerCallback: (e: ChangeEvent<HTMLInputElement>) => void
}
