import React from 'react'
import educationIcon from '../../assets/svg/educating.svg'
import editIcon from '../../assets/svg/edit.svg'
import deleteIcon from '../../assets/svg/delete.svg'
import styles from './ActionButtonsContainer.module.scss'
import { UpdatePackType } from '../../api/api-packsList'
import { useAppSelector } from '../../App/store'
import { Navigate } from 'react-router-dom'

export const ActionButtonsContainer: React.FC<ActionButtonsContainerType> = ({
  id,
  userId,
  cardsCount,
  educationsAction,
  editAction,
  deleteAction,
}) => {
  const profileId = useAppSelector(state => state.profile._id)

  const educationCallback = () => {
    educationsAction && educationsAction(id)
  }
  const editCallback = () => {
    editAction && editAction({ cardsPack: { _id: id, name: 'new Card' } })
  }
  const deleteCallback = () => {
    deleteAction && deleteAction(id)
  }

  return (
    <div className={styles.buttonWrapper}>
      {educationsAction && (
        <div>
          <button onClick={educationCallback} disabled={cardsCount === 0 && userId !== profileId}>
            <img src={educationIcon} alt="education icon" />
          </button>
        </div>
      )}
      {userId === profileId && editAction && (
        <div>
          <button onClick={editCallback}>
            <img src={editIcon} alt="edit icon" />
          </button>
        </div>
      )}

      {userId === profileId && deleteAction && (
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
  id: string
  userId: string
  educationsAction?: (id: string) => void
  editAction?: (data: UpdatePackType) => void
  deleteAction?: (id: string) => void
  cardsCount: number
}
