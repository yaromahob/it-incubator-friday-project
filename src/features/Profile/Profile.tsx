import React, { useEffect } from 'react'
import style from './Profile.module.scss'
import arrow from '../../assets/svg/profile/arrow.svg'
import defaultPhoto from '../../assets/png/Lesson 1/images.jpeg'
import logout from '../../assets/svg/profile/logout.svg'
import union from '../../assets/svg/profile/union.svg'
import SuperButton from '../../common/SuperButton/SuperButton'
import { User } from './User/User'
import { AppRootStateType, useAppDispatch, useAppSelector } from '../../App/store'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { logoutTC } from '../Login/loginReducer'

const Profile = () => {
  const isAuth = useAppSelector(state => state.app.isAuth)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    }
  })

  if (!isAuth) {
    return <div className={style.loading}>loading...</div>
  }
  const logOut = () => {
    dispatch(logoutTC())
  }

  return (
    <div className={style.profileWrapper}>
      <div className={style.arrow}>
        <img src={arrow} alt="arrow icon" />
        <span>Back to Packs List</span>
      </div>
      <div className={style.container}>
        <span className={style.info}>Personal Information</span>
        <User />
        <SuperButton className={style.button} onClick={logOut}>
          <img src={logout} />
          <span>Log out</span>
        </SuperButton>
      </div>
    </div>
  )
}

export default Profile
