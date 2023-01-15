import React from 'react'
import educationIcon from '../../assets/svg/educating.svg'
import editIcon from '../../assets/svg/edit.svg'
import deleteIcon from '../../assets/svg/delete.svg'
import styles from './ActionButtonsContainer.module.scss'

export const ActionButtonsContainer: React.FC<ActionButtonsContainerType> = ({
  educationsAction,
  editAction,
  deleteAction,
}) => {
  const educationCallback = () => {}
  const editCallback = () => {}
  const deleteCallback = () => {}
  return (
    <div className={styles.buttonWrapper}>
      <div>
        <button onClick={educationCallback}>
          <img src={educationIcon} alt="education icon" />
        </button>
      </div>
      {editAction && (
        <div>
          <button onClick={editCallback}>
            <img src={editIcon} alt="edit icon" />
          </button>
        </div>
      )}
      {deleteAction && (
        <div>
          <button onClick={deleteCallback}>
            <img src={deleteIcon} alt="delete icon" />
          </button>
        </div>
      )}
    </div>
  )
}

// types

export type ActionButtonsContainerType = {
  educationsAction: () => void
  editAction?: () => void
  deleteAction?: () => void
}