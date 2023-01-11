import React from 'react'
import style from './Profile.module.scss'
import arrow from '../../assets/svg/profile/arrow.svg'
import defaultPhoto from '../../assets/png/Lesson 1/images.jpeg'
import logout from '../../assets/svg/profile/logout.svg'
import union from '../../assets/svg/profile/union.svg'
import SuperButton from "../../common/SuperButton/SuperButton";
import {User} from "./User/User";
import {AppRootStateType, useAppDispatch, useAppSelector} from "../../App/store";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {logoutTC} from "../Login/loginReducer";

const Profile = () => {
    const email = useAppSelector(state => state.profile.email)
    const avatar = useAppSelector(state => state.profile.avatar)
    const isAuth = useAppSelector(state => state.app.isAuth)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch()


    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    if (!isAuth) {
        return <div>loading...</div>
    }
    const logOut = () => {
        dispatch(logoutTC())
    }
    const photo = avatar ? avatar : defaultPhoto

    return <div>
        <div className={style.arrow}><img src={arrow}/>
            <span>Back to Packs List</span>
        </div>
        <div className={style.container}>
            <span className={style.info}>Personal Information</span>
            <div className={style.avaContainer}>
                <img className={style.avatar} src={photo} alt="avatar"/>
                <div className={style.union}><img src={union}/></div>
            </div>
            <User/>
            <div className={style.email}>{email}</div>
            <SuperButton className={style.button} onClick={logOut}>
                <img src={logout}/>
                <span>Log out</span>
            </SuperButton>
        </div>
    </div>
}

export default Profile

