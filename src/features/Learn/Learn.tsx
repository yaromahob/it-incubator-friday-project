import React from 'react'
import styles from './learn.module.scss'
import SuperButton from '../../common/SuperButton/SuperButton'

export const Learn = () => {
  return (
    <div className={styles.learn}>
      <h3>Learn "1 pack!"</h3>
      <h5>Количество попыток ответов на вопрос: 12</h5>
      <div>
        <h1>Question:</h1>
        <h5>1+1</h5>
      </div>
      <div className={styles.sendBtn}>
        <SuperButton xType={'default'} type="submit">
          SHOW ANSWER
        </SuperButton>
      </div>
    </div>
  )
}
