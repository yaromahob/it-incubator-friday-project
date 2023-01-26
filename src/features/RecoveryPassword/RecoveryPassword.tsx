import React from 'react'
import { AppRootStateType, useAppDispatch } from '../../App/store'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'
import styles from './RecoveryPassword.module.scss'
import SuperInputText from '../../common/SuperInputText/SuperInputText'
import SuperButton from '../../common/SuperButton/SuperButton'
import { useSelector } from 'react-redux'
import { recoveryPasswordTC } from '../Login/loginReducer'
import { PATH } from '../../root'

type FormikErrorType = {
  email?: string
}
const RecoveryPassword = () => {
  const dispatch = useAppDispatch()
  const isRecoveryPassword = useSelector<AppRootStateType, boolean>(state => state.login.isRecoveryPassword)

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      return errors
    },
    onSubmit: values => {
      const data = {
        email: values.email,
        from: 'test-front-student <yaromahob@gmail.com>', //<innamiheikina93@gmail.com>
        message: `<div style="background-color: lime; padding: 15px">
                password recovery link: 
                 <a href='http://localhost:3000/it-incubator-friday-project/newPassword#$token$'>жми сюда</a></div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
      }
      dispatch(recoveryPasswordTC(data))
      formik.resetForm() //зачистить поле
    },
  })
  if (isRecoveryPassword) {
    return <Navigate to={PATH.CHECK_EMAIL} />
  }
  return (
    <div className={styles.signUp}>
      <h3>Forgot your password?</h3>

      <form onSubmit={formik.handleSubmit}>
        <label className={formik.touched.email && formik.errors.email ? styles.errorField : ''}>
          <SuperInputText type={'text'} placeholder="Email" {...formik.getFieldProps('email')} />

          <div className={styles.error}>{formik.touched.email && formik.errors.email && formik.errors.email}</div>
        </label>

        <p className={styles.description}>Enter your email address and we will send you further instructions</p>

        <div className={styles.sendBtn}>
          <SuperButton xType={'default'} type="submit">
            Send instructions
          </SuperButton>
        </div>
      </form>

      <p>Did you remember your password?</p>

      <NavLink to="/login"> Try logging in</NavLink>
    </div>
  )
}
export default RecoveryPassword
