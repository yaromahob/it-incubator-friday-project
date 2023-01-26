import React, { useEffect, useState } from 'react'
import { CardType, LearnCardType } from '../../api/api-cardsList'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppRootStateType, useAppDispatch } from '../../App/store'
import SuperButton from '../../common/SuperButton/SuperButton'
import styles from './learn.module.scss'
import { gradeCardUpdateTC, setCardTC } from '../CardList/Card-reducer'
import SuperCheckbox from '../../common/SuperCheckbox/SuperCheckbox'
import { PackType } from '../../api/api-packsList'
import { BackToPackList } from '../BackToPackList/BackToPackList'

const grades = ['Did not know', 'forgot', 'A lot of thought', 'Confused', 'Knew the answer']

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )
  console.log('test: ', sum, rand, res)

  return cards[res.id + 1]
}

export const Learn = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
  const { packId } = useParams() //id col

  console.log(packId)
  const cards = useSelector((store: AppRootStateType) => store.cardList.cards)

  const dispatch = useAppDispatch()

  const [card, setCard] = useState<CardType>({
    _id: 'fake',
    cardsPack_id: '',
    user_id: '',

    answer: 'answer fake',
    question: 'question fake',
    grade: 0,
    shots: 0,

    comments: '',
    type: '',
    rating: 0,
    more_id: '',

    created: '',
    updated: '',
  })

  useEffect(() => {
    if (cards?.length > 0) {
      setCard(getCard(cards))
    }
  }, [cards])

  useEffect(() => {
    dispatch(setCardTC({ cardsPack_id: packId! }))
  }, [])

  const pack = useSelector<AppRootStateType, PackType[]>(store => store.packList.cardPacks.filter(c => c._id === packId))
  console.log(pack[0].name)
  console.log(cards, 'cards')
  if (cards?.length < 0) {
    return <div>cards not defined</div>
  }
  console.log(card)
  const onNext = () => {
    setIsChecked(false)

    if (cards.length > 0) {
      setCard(getCard(cards))
    } else {
    }
  }
  const gradeUpdate = (data: LearnCardType) => {
    dispatch(gradeCardUpdateTC(data))
  }

  if (!isLoggedIn) {
    return <div> Not login user</div>
  }

  return (
    <>
      <BackToPackList />
      <div className={styles.learn}>
        <h2>Learn: "{pack[0].name}"</h2>
        <b>Question: {card.question}</b>
        <h5 style={{ color: 'gray' }}>Количество попыток ответов на вопрос:{card.shots}</h5>
        <div className={styles.sendBtn}>
          <SuperButton onClick={() => setIsChecked(true)}>Show answer</SuperButton>
        </div>
        {isChecked && (
          <>
            <b>Answer:{card.answer}</b>

            {grades.map((g, i) => (
              <div className={styles.sendBtn}>
                <SuperCheckbox key={'grade-' + i} onClick={() => gradeUpdate({ grade: i + 1, card_id: card._id })}>
                  {g}
                </SuperCheckbox>
              </div>
            ))}
            <div className={styles.sendBtn}>
              <SuperButton onClick={onNext}>next</SuperButton>
            </div>
          </>
        )}
      </div>
    </>
  )
}
