import React from 'react'
import logo from 'assets/svg/logo.svg'
import { SuperButton } from 'common/SuperButton'
import styles from './Header.module.scss'
import { useAppSelector } from 'App/store'
import defaultPhoto from 'assets/png/Lesson 1/default-avatar-profile.jpg'
import { NavLink } from 'react-router-dom'
import { PATH } from '../../root'

export const Header = () => {
  const isAuth = useAppSelector(state => state.app.isAuth)
  const avatar = useAppSelector(state => state.profile.avatar)
  const nickName = useAppSelector(state => state.header.name)
  const photo = avatar ? avatar : defaultPhoto

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <NavLink to={PATH.PACK_LIST}>
          <img src={logo} alt="logo" />
        </NavLink>
        {isAuth ? (
          <NavLink to={PATH.PROFILE} className={styles.accountPhoto}>
            <span>{nickName}</span> <img src={photo} alt="avatar" />
          </NavLink>
        ) : (
          <NavLink to={PATH.LOGIN} className={styles.account}>
            <SuperButton>Sign In</SuperButton>
          </NavLink>
        )}
      </div>
    </header>
  )
}
