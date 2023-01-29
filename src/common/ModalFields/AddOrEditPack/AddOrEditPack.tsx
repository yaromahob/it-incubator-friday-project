import React, { ChangeEvent } from 'react'
import styles from './AddOrEditPack.module.scss'
import SuperCheckbox from '../../SuperCheckbox/SuperCheckbox'
import SuperDebouncedInput from '../../SuperDebouncedInput/SuperDebouncedInput'
import noImage from '../../../assets/svg/no_image_available.svg'
import { InputUploadCover } from '../../UploadCover/UploadCover'

export const AddOrEditPack: React.FC<AddOrEditPack> = ({ newPackName, onChange, onChangePrivate, deckCoverForAdd }) => {
  return (
    <>
      <div className={styles.inputsField}>
        <label className={styles.uploadCover} title={'use an image with a maximum height of 170px'}>
          Upload cover
          <InputUploadCover />
        </label>
        {deckCoverForAdd && (
          <label className={styles.cover}>
            Cover pack
            <img src={deckCoverForAdd ? deckCoverForAdd : noImage} alt="cover image" />
          </label>
        )}
        <label className={styles.inputF}>
          Name Pack
          <SuperDebouncedInput value={newPackName} onChange={onChange} />
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
  deckCoverForAdd: null | string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  isPrivate: boolean
  onChangePrivate: (e: ChangeEvent<HTMLInputElement>) => void
}
