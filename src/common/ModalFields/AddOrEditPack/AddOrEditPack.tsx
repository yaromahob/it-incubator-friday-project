import React, { ChangeEvent } from 'react'
import styles from './AddOrEditPack.module.scss'
import noImage from '../../../assets/svg/no_image_available.svg'
import { useAppDispatch } from 'App/store'
import { addPackTC } from 'features/PackList/PackList-reducer'
import { SuperCheckbox } from '../../SuperCheckbox'
import { InputUploadCover } from '../../UploadCover'
import { SuperDebouncedInput } from '../../SuperDebouncedInput'

export const AddOrEditPack: React.FC<AddOrEditPack> = ({
  newPackName,
  onChange,
  isPrivate,
  onChangePrivate,
  deckCoverForAdd,
  coverCallback,
}) => {
  return (
    <>
      <div className={styles.inputsField}>
        <label className={styles.uploadCover} title={'use an image with a maximum height of 170px'}>
          Upload cover
          <InputUploadCover callback={coverCallback} />
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
  coverCallback: (v: string) => void
  isPrivate: boolean
  onChangePrivate: (e: ChangeEvent<HTMLInputElement>) => void
}
