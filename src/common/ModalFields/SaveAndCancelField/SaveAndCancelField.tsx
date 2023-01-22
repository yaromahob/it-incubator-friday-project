import React from 'react'
import styles from './SaveAndCancelField.module.scss'
import SuperButton from '../../SuperButton/SuperButton'

export const SaveAndCancelField: React.FC<SaveAndCancelFieldType> = ({ type }) => {
  const finalClassName = type === 'Save' ? styles.save : styles.delete
  return (
    <div className={styles.buttonsWrapper}>
      <SuperButton children={'Cancel'} xType={'secondary'} className={styles.cancel} />
      <SuperButton children={type} className={finalClassName} />
    </div>
  )
}

// types

type SaveAndCancelFieldType = {
  type: 'Save' | 'Delete'
}
