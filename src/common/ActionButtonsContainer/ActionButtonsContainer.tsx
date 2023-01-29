import React, { MouseEvent } from 'react'
import educationIcon from '../../assets/svg/educating.svg'
import editIcon from '../../assets/svg/edit.svg'
import deleteIcon from '../../assets/svg/delete.svg'
import styles from './ActionButtonsContainer.module.scss'
import { UpdatePackType } from '../../api/api-packsList'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { Navigate, useNavigate } from 'react-router-dom'
import { PATH } from '../../root'
import { deckCoverForAddAC } from '../../features/PackList/PackList-reducer'

export const ActionButtonsContainer: React.FC<ActionButtonsContainerType> = ({
  id,
  userId,
  packName,
  deckCover,
  packAnswer,
  cardsCount,
  educationsAction,
  editAction,
  deleteAction,
}) => {
  const dispatch = useAppDispatch()
  const profileId = useAppSelector(state => state.profile._id)
  const navigate = useNavigate()
  const educationCallback = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`${PATH.LEARN}/${id}`)
  }
  const editCallback = () => {
    editAction && editAction(id, packName!, packAnswer, deckCover)
  }
  const deleteCallback = () => {
    deleteAction && deleteAction(id, packName!)
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

// types                data: UpdatePackType

export type ActionButtonsContainerType = {
  id: string
  userId: string
  packName?: string
  deckCover?: string
  packAnswer?: string
  educationsAction?: (id: string) => void
  editAction?: (id: string, packName: string, packAnswer?: string, deckCoverEdit?: string) => void
  deleteAction?: (id: string, packName: string) => void
  cardsCount?: number
}
