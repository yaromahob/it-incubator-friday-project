import React, { ChangeEvent, useState } from 'react'
import { HeaderModal } from '../../common/ModalFields/HeaderModal/HeaderModal'
import { AddOrEditPack } from '../../common/ModalFields/AddOrEditPack/AddOrEditPack'
import { SaveAndCancelField } from '../../common/ModalFields/SaveAndCancelField/SaveAndCancelField'
import { useAppDispatch } from '../../App/store'
import { addPackTC } from '../PackList/PackList-reducer'

export const AddNewPack: React.FC<AddNewPackType> = ({ open, callback }) => {
  const [newPackName, setNewPackName] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const dispatch = useAppDispatch()

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPackName(e.currentTarget.value)
  }

  const onPrivateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(false)
  }

  const onSaveHandler = () => {
    dispatch(addPackTC({ cardsPack: { name: 'h1 my name is', private: false } }))
  }

  return (
    <div>
      <HeaderModal titleModal={'Add new pack'} />
      <AddOrEditPack newPackName={newPackName} onChange={onChangeHandler} private={isPrivate} onChangePrivate={onPrivateHandler} />
      <SaveAndCancelField type={'Save'} onAction={onSaveHandler} />
    </div>
  )
}

type AddNewPackType = {
  open: boolean
  callback: (value: boolean) => void
}
