import React from 'react'
import styles from './DeletePackOrCard.module.scss'
import { HeaderModal } from '../common/HeaderModal/HeaderModal'
import { SaveAndCancelField } from '../common/ButtonsField/SaveAndCancelField'

export const DeletePackOrCard: React.FC<DeletePackOrCardType> = ({ nameItem }) => {
  return (
    <>
      <div className={styles.packOrCardField}>
        <span>
          Do you really want to remove <b>{nameItem}</b>? <br /> All cards will be deleted.
        </span>
      </div>
    </>
  )
}

type DeletePackOrCardType = {
  nameItem: string
}
