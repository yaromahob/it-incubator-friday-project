import React, { useEffect, useState } from 'react'
import styles from './FriendOrMyCard.module.scss'
import { ActionButtonsContainer } from '../../common/ActionButtonsContainer/ActionButtonsContainer'
import { useParams } from 'react-router-dom'
import { addCardTC, setCardTC } from '../CardList/Card-reducer'
import { useAppDispatch, useAppSelector } from '../../App/store'
import SuperButton from '../../common/SuperButton/SuperButton'

export const FriendOrMyCard: React.FC<FriendOrMyCardType> = ({ cardPackID }) => {
  const [showAction, setShowAction] = useState(false)
  const dispatch = useAppDispatch()
  const userID = useAppSelector(state => state.profile._id)
  const { packId } = useParams()

  const educationCardList = (id: string) => {
    dispatch(setCardTC({ cardsPack_id: id }))
  }

  const addCard = () => {
    dispatch(addCardTC({ card: { cardsPack_id: packId!, question: '123' } }))
  }

  const deleteCard = (id: string) => {
    console.log(id)
  }

  const updateCard = (data: any) => {
    console.log(data)
  }

  useEffect(() => {
    if (!packId) return
    dispatch(setCardTC({ cardsPack_id: packId }))
  }, [packId])

  if (cardPackID) {
    return (
      <div className={styles.myPackWrapper}>
        <div>
          <h2>My Pack</h2>
          <div className={styles.editMyPack} onClick={() => setShowAction(!showAction)}>
            <div className={styles.spanWrapper}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            {/* T O D O   T O D O   T O D O*/}
            {/*ActionButtonsContainer ИД чего нужно? какой юзерИД нужен и прочая информация, может она не обязательна?*/}
            {showAction && (
              <div className={styles.actionButtons}>
                <ActionButtonsContainer
                  id={packId!}
                  userId={userID}
                  cardsCount={5}
                  deleteAction={deleteCard}
                  editAction={updateCard}
                  educationsAction={educationCardList}
                />
              </div>
            )}
          </div>
        </div>
        <SuperButton onClick={addCard}>Add new card</SuperButton>
      </div>
    )
  } else {
    return (
      <div className={styles.myPackWrapper}>
        <h2>Friend’s Pack</h2>
        <SuperButton>Learn to pack</SuperButton>
      </div>
    )
  }
}

type FriendOrMyCardType = {
  cardPackID?: string
}
