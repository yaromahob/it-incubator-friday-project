import React from 'react'
import styles from './SaveAndCancelField.module.scss'
import SuperButton from '../../SuperButton/SuperButton'

export const SaveAndCancelField: React.FC<SaveAndCancelFieldType> = ({ type, onAction, cancelAction }) => {
  const finalClassName = type === 'Save' ? styles.save : styles.delete
  return (
    <div className={styles.buttonsWrapper}>
      <SuperButton children={'Cancel'} xType={'secondary'} className={styles.cancel} onClick={cancelAction} />
      <SuperButton children={type} className={finalClassName} onClick={onAction} />
    </div>
  )
}

// types

type SaveAndCancelFieldType = {
  type: 'Save' | 'Delete'
  onAction: () => void
  cancelAction: () => void
}
