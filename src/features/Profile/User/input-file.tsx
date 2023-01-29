import React, { ChangeEvent, useRef } from 'react'
import style from './User.module.scss'
import union from '../../../assets/svg/profile/union.svg'
import { useAppDispatch } from '../../../App/store'
import { updateUsersDataTC } from '../profileReducer'

export const InputFile = () => {
  const dispatch = useAppDispatch()
  const inRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inRef && inRef.current?.click()
  }
  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files && e.target.files[0]
      if (file.size < 4000000) {
        const reader = new FileReader()

        reader.onloadend = () => {
          const file64 = reader.result as string
          dispatch(updateUsersDataTC({ avatar: file64 }))
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div>
      <button onClick={selectFileHandler} className={style.union}>
        <img src={union} />
      </button>
      <input style={{ display: 'none' }} ref={inRef} type="file" accept={'image/*'} onChange={upload} />
    </div>
  )
}
