import React, { ChangeEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { deckCoverForAddAC } from '../../features/PackList/PackList-reducer'
import { useAppDispatch } from '../../App/store'

type InputUploadCoverType = {
  callback: (value: string) => void
}
export const InputUploadCover: React.FC<InputUploadCoverType> = ({ callback }) => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          callback(file64)
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const file64 = reader.result as string
      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  return (
    <label>
      <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
      <IconButton component="span">
        <CloudUploadIcon />
      </IconButton>
    </label>
  )
}
