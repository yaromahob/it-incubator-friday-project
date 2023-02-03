import React from 'react'
import { SuperInputText } from 'common/SuperInputText'

import showPass from 'assets/svg/eye.svg'
import { FieldInputProps } from 'formik/dist/types'
import styles from './PasswordContainer.module.scss'

type PasswordContainerType = FieldInputProps<string> & {
  placeholder?: string
}

export const PasswordContainer: React.FC<PasswordContainerType> = ({ ...restProps }) => {
  const [visiblePass, setVisiblePass] = React.useState(false)

  const visiblePassHandler = () => {
    setVisiblePass(visible => !visible)
  }

  return (
    <div className={styles.passwordContainer}>
      <SuperInputText type={visiblePass ? 'text' : 'password'} placeholder={restProps.placeholder} {...restProps} />

      <div className={visiblePass ? styles.active : styles.showPass} onClick={visiblePassHandler}>
        <img src={showPass} alt="show password" />
      </div>
    </div>
  )
}
