import React from 'react'
import cross from '../../../assets/svg/cross.svg'
import styles from './HeaderModal.module.scss'

export const HeaderModal: React.FC<HeaderModalType> = ({ titleModal, callback }) => {
  return (
    <div className={styles.headerModal}>
      {/* Add new pack || Edit pack || Delete Card || Delete Pack */}
      <h2>{titleModal}</h2>
      <button onClick={callback}>×</button>
    </div>
  )
}

type HeaderModalType = {
  titleModal: 'Add new card' | 'Add new pack' | 'Edit pack' | 'Edit card' | 'Delete Pack' | 'Delete Card'
  callback: () => void
}
