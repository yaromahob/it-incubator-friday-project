import React from 'react'
import styles from './SignUp.module.scss'
import SuperButton from '../../common/SuperButton/SuperButton'
import { Navigate, NavLink } from 'react-router-dom'
import { PasswordContainer } from './PasswordContainer'
import { useFormik } from 'formik'
import SuperInputText from '../../common/SuperInputText/SuperInputText'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { signUpTC } from './signUp-reducer'

type FormikErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}
export const SignUp = () => {
  const dispatch = useAppDispatch()
  const isSignUp = useAppSelector(state => state.signUp.isSignUp)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      // abcdeg12/abcdEG12 - valid pass
      // !/^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/i.test(values.password)
      if (values.password.length < 9) {
        errors.password = 'Password should be more 8 letters'
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords have to match'
      }
      return errors
    },
    onSubmit: values => {
      const data = {
        email: values.email,
        password: values.password,
      }
      dispatch(signUpTC(data))
      formik.resetForm()
    },
  })
  if (isSignUp) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={styles.signUp}>
     
      <h3>Sign Up</h3>

      <form onSubmit={formik.handleSubmit}>
        <label className={formik.touched.email && formik.errors.email ? styles.errorField : ''}>
          Email
          <SuperInputText type={'text'} {...formik.getFieldProps('email')} />
          
          <div className={styles.error}>
            {formik.touched.email && formik.errors.email && formik.errors.email}
          </div>
          
        </label>
        <label
          className={formik.touched.password && formik.errors.password ? styles.errorField : ''}
        >
          Password
          {/*<input type="password" name="password" />*/}
          <PasswordContainer {...formik.getFieldProps('password')} />
          <div className={styles.error}>
            {formik.touched.password && formik.errors.password && formik.errors.password}
          </div>
        </label>
        <label
          className={
            formik.touched.confirmPassword && formik.errors.confirmPassword ? styles.errorField : ''
          }
        >
          Confirm password
          <PasswordContainer {...formik.getFieldProps('confirmPassword')} />
          <div className={styles.error}>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword &&
              formik.errors.confirmPassword}
          </div>
        </label>
        <div className={styles.sendBtn}>
          <SuperButton xType={'default'} type="submit">
            Sign Up
          </SuperButton>
        </div>
      </form>
      <p>Already have an account?</p>
      <NavLink to="/login">Sign In</NavLink>
    </div>
  )
}
