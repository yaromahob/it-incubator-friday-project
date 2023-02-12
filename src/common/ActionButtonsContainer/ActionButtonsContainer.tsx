import React, { MouseEvent } from 'react'
import educationIcon from '../../assets/svg/educating.svg'
import editIcon from '../../assets/svg/edit.svg'
import deleteIcon from '../../assets/svg/delete.svg'
import styles from './ActionButtonsContainer.module.scss'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../root'

export const ActionButtonsContainer: React.FC<ActionButtonsContainerType> = ({
  id,
  userId,
  cardQuestion,
  deckCover,
  cardAnswer,
  cardsCount,
  educationsAction,
  editAction,
  deleteAction,
}) => {
  const profileId = useAppSelector(state => state.profile._id)
  const navigate = useNavigate()
  const educationCallback = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`${PATH.LEARN}/${id}`)
  }
  const editCallback = () => {
    editAction && editAction(id, cardQuestion!, cardAnswer, deckCover)
  }
  const deleteCallback = () => {
    deleteAction && deleteAction(id, cardQuestion!)
  }

  return (
    <div className={styles.buttonWrapper}>
      {educationsAction && (
        <div onClick={e => educationCallback(e)}>
          <button disabled={cardsCount === 0 && userId !== profileId}>
            <img src={educationIcon} alt="education icon" />
          </button>
        </div>
      )}
      {userId === profileId && editAction && (
        <div onClick={editCallback}>
          <button>
            <img src={editIcon} alt="edit icon" />
          </button>
        </div>
      )}

      {userId === profileId && deleteAction && (
        <div onClick={deleteCallback}>
          <button>
            <img src={deleteIcon} alt="delete icon" />
          </button>
        </div>
      )}
    </div>
  )
}

export type ActionButtonsContainerType = {
  id: string
  userId: string
  cardQuestion?: string
  deckCover?: string
  cardAnswer?: string
  educationsAction?: (id: string) => void
  editAction?: (id: string, packName: string, packAnswer?: string, deckCoverEdit?: string) => void
  deleteAction?: (id: string, packName: string) => void
  cardsCount?: number
}
