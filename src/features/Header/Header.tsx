import React from 'react';
import logo from '../../assets/svg/logo.svg'
import SuperButton from "../../common/SuperButton/SuperButton";
import styles from './Header.module.scss'
import {useAppSelector} from "../../App/store";
import defaultPhoto from "../../assets/png/Lesson 1/images.jpeg";

export const Header = () => {
    const isAuth = useAppSelector(state => state.app.isAuth)
    const avatar = useAppSelector(state => state.profile.avatar)
    const nickName = useAppSelector(state => state.header.name)
    const photo = avatar ? avatar : defaultPhoto

    return (
        <header className={styles.header}>
            <div className={styles.headerWrapper}>
                <div>
                    <img src={logo} alt="logo"/>
                </div>
                {isAuth
                    ?
                    <div className={styles.accountPhoto}>
                        <span>{nickName}</span> <img src={photo} alt="avatar"/>
                    </div>
                    :
                    <div className={styles.account}>
                        <SuperButton>Sign In</SuperButton>
                    </div>
                }
            </div>
        </header>
    );
};

