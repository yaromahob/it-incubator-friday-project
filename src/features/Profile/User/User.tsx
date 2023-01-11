import React, {ChangeEvent, useState} from 'react'
import style from './User.module.scss'
import edit from '../../../assets/svg/profile/edit.svg'
import SuperButton from "../../../common/SuperButton/SuperButton";
import {useAppDispatch, useAppSelector} from "../../../App/store";
import {updateUsersDataTC} from "../profileReducer";


export const User = () => {
    const nickName = useAppSelector(state => state.profile.name)
    const appDispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState(nickName)
    const openInput = () => {
        setIsOpen(true)
    }
    const setUsersData = () => {
        appDispatch(updateUsersDataTC(name, ""))
        setIsOpen(false)
    }

    const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
    }
    return (
        <div className={style.nickName}>

            {isOpen
                ?
                <div className={style.input}>
                    <div className={style.nick}>Nickname</div>
                    <div className={style.inputContainer}>
                        <input type="text" value={name} onChange={changeNameHandler} onBlur={setUsersData}/>
                        <SuperButton onClick={setUsersData} className={style.saveButton}>
                            SAVE
                        </SuperButton>
                    </div>
                    <div className={style.border}></div>
                </div>
                :
                <div>
                    <span>{nickName}</span>
                    <button onClick={openInput}><img src={edit}/></button>
                </div>
            }
        </div>
    )
}