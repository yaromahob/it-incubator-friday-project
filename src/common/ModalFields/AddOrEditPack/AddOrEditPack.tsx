import React, { ChangeEvent } from 'react'
import styles from './AddOrEditPack.module.scss'
import SuperInputText from '../../SuperInputText/SuperInputText'
import SuperCheckbox from '../../SuperCheckbox/SuperCheckbox'

export const AddOrEditPack: React.FC<AddOrEditPack> = ({ newPackName, onChange }) => {
  return (
    <>
      <div className={styles.inputsField}>
        <label className={styles.inputF}>
          Name Pack
          <SuperInputText type={'text'} value={newPackName} onChange={onChange} />
        </label>
        <label className={styles.checkboxF}>
          <SuperCheckbox />
          Private pack
        </label>
      </div>
    </>
  )
}

type AddOrEditPack = {
  newPackName: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  private: boolean
  onChangePrivate: (e: ChangeEvent<HTMLInputElement>) => void
}
