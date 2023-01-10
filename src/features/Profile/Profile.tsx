import React, {useEffect} from 'react'
import style from './Profile.module.scss'
import arrow from '../../assets/svg/profile/arrow.svg'
import avatar from '../../assets/png/Lesson 1/images.jpeg'
import logout from '../../assets/svg/profile/logout.svg'
import union from '../../assets/svg/profile/union.svg'
import SuperButton from "../../common/SuperButton/SuperButton";
import {User} from "./User/User";
import axios from "axios";
import {useAppDispatch} from "../../App/store";
import {getProfileAC} from "./profileReducer";



const Profile = () => {
    const appDispatch = useAppDispatch()
    const instance = axios.create({
        baseURL: 'http://localhost:7542/2.0/',
        withCredentials: true,
    })
    //
    // useEffect(() => {
    //     instance.post('auth/login', {email: "bakhram7493@gmail.com", password: "qwertyqwerty", rememberMe: true})
    //         .then(()=>{
    //             instance.post('auth/me',{})
    //                 .then((res)=>{
    //                     const {_id,email,avatar,name,...rest} = res.data
    //                     appDispatch(getProfileAC(_id,email,name,avatar))
    //                 })
    //         })
    //
    //  })


    return <div>
        <div className={style.arrow}><img src={arrow}/>
            <span>Back to Packs List</span>
        </div>

        <div className={style.container}>
            <span className={style.info}>Personal Information</span>
            <div className={style.avaContainer}>
                <img className={style.avatar} src={avatar} alt="avatar"/>
                <div className={style.union}><img src={union}/></div>
            </div>
            <User/>
            <div className={style.email}>j&johnson@gmail.com</div>
            <SuperButton className={style.button}>
                <img src={logout}/>
                <span>Log out</span>
            </SuperButton>
        </div>
    </div>
}

export default Profile

