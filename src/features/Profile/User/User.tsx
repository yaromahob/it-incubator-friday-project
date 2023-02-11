import React, { ChangeEvent, useState } from 'react'
import style from './User.module.scss'
import edit from '../../../assets/svg/profile/edit.svg'
import SuperButton from '../../../common/SuperButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../../App/store'
import { changeUsersNameAC, updateUsersDataTC } from '../profileReducer'
import defaultPhoto from '../../../assets/png/Lesson 1/default-avatar-profile.jpg'
import { InputFile } from './input-file'

export const User = () => {
  const nickName = useAppSelector(state => state.profile.name)
  const avatar = useAppSelector(state => state.profile.avatar)
  const email = useAppSelector(state => state.profile.email)
  const [error, setError] = useState('')
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  console.log(nickName)
  const openInput = () => {
    setIsOpen(true)
    setError('')
  }
  const setUsersData = () => {
    if (nickName.length > 20 || nickName.length < 3) {
      setError('name must be more than 3 and less than 20')
    } else {
      dispatch(updateUsersDataTC({ name: nickName, avatar: avatar }))
    }
    setIsOpen(false)
  }
  const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeUsersNameAC(event.currentTarget.value.trim()))
  }

  console.log(nickName)
  const photo = avatar ? avatar : defaultPhoto
  return (
    <>
      <div className={style.avaContainer}>
        <img className={style.avatar} src={photo} alt="avatar" />
        <InputFile />
      </div>
      <div className={style.nickName}>
        {isOpen ? (
          <div className={style.input}>
            <div className={style.nick}>Nickname</div>
            <div className={style.inputContainer}>
              <input type="text" value={nickName} onChange={changeNameHandler} onBlur={setUsersData} />
              <SuperButton onClick={setUsersData} className={style.saveButton}>
                SAVE
              </SuperButton>
            </div>
            <div className={style.border}></div>
          </div>
        ) : (
          <div>
            <span className={error ? style.inputError : ''}>{error ? error : nickName}</span>
            <button onClick={openInput}>
              <img src={edit} alt="photo" />
            </button>
          </div>
        )}
      </div>
      <div className={style.email}>{email}</div>
    </>
  )
}
