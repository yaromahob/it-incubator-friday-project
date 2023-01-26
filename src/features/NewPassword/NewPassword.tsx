import React, { useEffect, useState } from 'react'
import { AppRootStateType, useAppDispatch } from '../../App/store'
import { useFormik } from 'formik'
import { newPasswordTC } from '../Login/loginReducer'
import SuperButton from '../../common/SuperButton/SuperButton'
import styles from './NewPassword.module.scss'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PasswordContainer } from '../SignUp/PasswordContainer'
import { PATH } from '../../root'

export type FormikErrorType = {
  password?: string
}

export const NewPassword = () => {
  const dispatch = useAppDispatch()
  const isNewPassword = useSelector<AppRootStateType, boolean>(state => state.login.isNewPassword)
  console.log(window.location.href.split('#')[1])
  const [token, seToken] = useState('')
  useEffect(() => {
    const currentToken = window.location.href.split('#')[1]
    if (currentToken) {
      seToken(currentToken)
    }
  }, [])
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}
      if (values.password.length < 9) {
        errors.password = 'Password should be more 8 letters'
      }
      return errors
    },
    onSubmit: values => {
      const data = {
        password: values.password,
        resetPasswordToken: token,
      }
      dispatch(newPasswordTC(data))
      formik.resetForm() //зачистить поле
    },
  })

  if (isNewPassword) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={styles.signUp}>
      <h3>Create new password</h3>

      <form onSubmit={formik.handleSubmit}>
        <label className={formik.touched.password && formik.errors.password ? styles.errorField : ''}>
          <PasswordContainer {...formik.getFieldProps('password')} placeholder="Password" />

          <div className={styles.error}>{formik.touched.password && formik.errors.password && formik.errors.password}</div>
        </label>
        <p className={styles.description}>Create new password and we will send you further instructions to email</p>
        <div className={styles.sendBtn}>
          <SuperButton xType={'default'} type="submit">
            Create new password
          </SuperButton>
        </div>
      </form>
    </div>
  )
}
