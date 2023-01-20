import React from 'react'
import styles from './ModalFields.module.scss'
import cross from '../../assets/svg/cross.svg'
import SuperInputText from '../SuperInputText/SuperInputText'
import SuperCheckbox from '../SuperCheckbox/SuperCheckbox'
import SuperButton from '../SuperButton/SuperButton'
import { AddOrEditPack } from './AddOrEditPack/AddOrEditPack'
import { SaveAndCancelField } from './ButtonsField/SaveAndCancelField'

export const ModalFields = () => {
  return (
    <div className={styles.modalWrapper}>
      <AddOrEditPack titleModal={'Add new pack'} />

      <SaveAndCancelField type={'Save'} />
    </div>
  )
}

// types
