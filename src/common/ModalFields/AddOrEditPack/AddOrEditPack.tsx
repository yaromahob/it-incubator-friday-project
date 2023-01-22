import React from 'react'
import styles from './AddOrEditPack.module.scss'
import cross from '../../../assets/svg/cross.svg'
import SuperInputText from '../../SuperInputText/SuperInputText'
import SuperCheckbox from '../../SuperCheckbox/SuperCheckbox'
import { HeaderModal } from '../common/HeaderModal/HeaderModal'

export const AddOrEditPack: React.FC<AddOrEditPack> = () => {
  return (
    <>
      <div className={styles.inputsField}>
        <label className={styles.inputF}>
          Name Pack
          <SuperInputText type={'text'} />
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
  //Entry otherTypes
}
