import React from 'react'
import styles from './AddOrEditPack.module.scss'
import cross from '../../../assets/svg/cross.svg'
import SuperInputText from '../../SuperInputText/SuperInputText'
import SuperCheckbox from '../../SuperCheckbox/SuperCheckbox'

export const AddOrEditPack: React.FC<AddOrEditPack> = ({ titleModal: string }) => {
  return (
    <>
      <div className={styles.headerModal}>
        {/* Add new pack || Edit pack */}
        <h2>{/*titleModal*/}</h2>
        <button>
          <img src={cross} alt="cross" />
        </button>
      </div>

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
  titleModal: string
  //Entry otherTypes
}
