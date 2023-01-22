import React from 'react'
import cross from '../../../../assets/svg/cross.svg'
import styles from './HeaderModal.module.scss'

export const HeaderModal: React.FC<HeaderModalType> = ({ titleModal }) => {
  return (
    <div className={styles.headerModal}>
      {/* Add new pack || Edit pack || Delete Card || Delete Pack */}
      <h2>{titleModal}</h2>
      <button>
        <img src={cross} alt="cross" />
      </button>
    </div>
  )
}

type HeaderModalType = {
  titleModal: 'Add new Pack' | 'Edit pack' | 'Delete Pack' | 'Delete Card'
}
