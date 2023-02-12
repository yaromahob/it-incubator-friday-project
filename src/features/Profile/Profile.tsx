import React, { useEffect } from 'react'
import style from './Profile.module.scss'
import logout from 'assets/svg/profile/logout.svg'
import { SuperButton } from 'common/SuperButton'
import { User } from './User/User'
import { AppRootStateType, useAppDispatch, useAppSelector } from 'App/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutTC } from '../Login/loginReducer'
import { BackToPackList } from '../BackToPackList/BackToPackList'
import { PATH } from '../../root'
import { CircularProgress } from '@mui/material'

const Profile = () => {
  const isAuth = useAppSelector(state => state.app.isAuth)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) navigate(PATH.LOGIN)
  })

  if (!isAuth) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }
  const logOut = () => {
    dispatch(logoutTC())
  }

  return (
    <div className={style.profileWrapper}>
      <BackToPackList />
      <div className={style.container}>
        <span className={style.info}>Personal Information</span>
        <User />
        <SuperButton className={style.button} onClick={logOut}>
          <img src={logout} alt="icon" />
          <span>Log out</span>
        </SuperButton>
      </div>
    </div>
  )
}

export default Profile
