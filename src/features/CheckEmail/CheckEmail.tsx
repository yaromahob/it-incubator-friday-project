import styles from './CheckEmail.module.scss'
import SuperButton from '../../common/SuperButton/SuperButton'
import { NavLink } from 'react-router-dom'
import React from 'react'
import checkEmail from '../../assets/svg/checkEmail.svg'

type FormikErrorType = {
  email?: string
}
export const CheckEmail = () => {
  return (
    <div className={styles.signUp}>
      <h3>Check Email</h3>
      <img src={checkEmail} alt="check email" />
      <p className={styles.description}>We`re send an E mail with instructions to example@mail.com</p>
      <div className={styles.sendBtn}>
        <SuperButton xType={'default'} type="submit">
          <NavLink to={'/login'}>Back to login</NavLink>
        </SuperButton>
      </div>
    </div>
  )
}
