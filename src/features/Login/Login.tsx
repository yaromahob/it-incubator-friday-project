import { AppRootStateType, useAppDispatch } from 'App/store'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'
import styles from './Login.module.scss'
import { SuperInputText } from 'common/SuperInputText'
import { PasswordContainer } from '../SignUp/PasswordContainer'
import { SuperButton } from 'common/SuperButton'
import React from 'react'
import { useSelector } from 'react-redux'
import { SuperCheckbox } from 'common/SuperCheckbox'
import { PATH } from '../../root'
import { loginTC } from './loginReducer'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (values.password.length < 9) {
        errors.password = 'Password should be more 8 letters'
      }

      return errors
    },
    onSubmit: values => {
      debugger
      dispatch(loginTC(values))
      formik.resetForm() //зачистить поле
    },
  })
  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />
  }

  return (
    <div className={styles.signUp}>
      <h3>Sign in</h3>
      <form onSubmit={formik.handleSubmit}>
        <label className={formik.touched.email && formik.errors.email ? styles.errorField : ''}>
          Email
          <SuperInputText type={'text'} {...formik.getFieldProps('email')} />
          <div className={styles.error}>{formik.touched.email && formik.errors.email && formik.errors.email}</div>
        </label>
        <label className={formik.touched.password && formik.errors.password ? styles.errorField : ''}>
          Password
          {/*<input type="password" name="password" />*/}
          <PasswordContainer {...formik.getFieldProps('password')} />
          <div className={styles.error}>{formik.touched.password && formik.errors.password && formik.errors.password}</div>
        </label>

        <div className={styles.checkboxField}>
          <SuperCheckbox {...formik.getFieldProps('rememberMe')}>Remember me</SuperCheckbox>
        </div>

        <p>
          <NavLink to="/recoveryPassword">Forgot Password?</NavLink>
        </p>
        <div className={styles.sendBtn}>
          <SuperButton xType={'default'} type="submit">
            Sign in
          </SuperButton>
        </div>
      </form>
      <p>Already have an account?</p>
      <NavLink to="/signUp">Sign Up</NavLink>
    </div>
  )
}
export default Login
