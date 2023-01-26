import React, { ChangeEvent } from 'react'
import styles from './AddOrEditPack.module.scss'
import SuperInputText from '../../SuperInputText/SuperInputText'
import SuperCheckbox from '../../SuperCheckbox/SuperCheckbox'
import SuperDebouncedInput from '../../SuperDebouncedInput/SuperDebouncedInput'

export const AddOrEditPack: React.FC<AddOrEditPack> = ({ newPackName, onChange, isPrivate, onChangePrivate }) => {
  return (
    <>
      <div className={styles.inputsField}>
        <label className={styles.inputF}>
          Name Pack
          <SuperDebouncedInput value={newPackName} onChange={onChange} />
          {/*<SuperInputText type={'text'} value={newPackName} onChange={onChange} />*/}
        </label>
        <label className={styles.checkboxF}>
          <SuperCheckbox onChange={onChangePrivate} />
          Private pack
        </label>
      </div>
    </>
  )
}

type AddOrEditPack = {
  newPackName: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  isPrivate: boolean
  onChangePrivate: (e: ChangeEvent<HTMLInputElement>) => void
}
