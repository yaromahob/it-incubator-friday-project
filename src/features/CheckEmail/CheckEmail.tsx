import { useAppDispatch } from '../../App/store'
import { useFormik } from 'formik'
import styles from './CheckEmail.module.scss'
import SuperInputText from '../../common/SuperInputText/SuperInputText'
import SuperButton from '../../common/SuperButton/SuperButton'
import { NavLink } from 'react-router-dom'
import React from 'react'
import checkEmail from '../../assets/svg/checkEmail.svg'

type FormikErrorType = {
  email?: string
}
const CheckEmail = () => {
  const dispatch = useAppDispatch()
  /* if (isSignUp) {
       return <Navigate to={'/login'} />
     }*/

  return (
    <div className={styles.signUp}>
      <h3>Check Email</h3>
      <img src={checkEmail} alt="check email" />
      <p className={styles.description}>
        We`re send an E mail with instructions to example@mail.com
      </p>
      <div className={styles.sendBtn}>
        <SuperButton xType={'default'} type="submit">
          Back to login
        </SuperButton>
      </div>
    </div>
  )
}

export default CheckEmail
