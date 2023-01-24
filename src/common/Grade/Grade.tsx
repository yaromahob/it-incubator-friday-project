import React, { ChangeEvent, SyntheticEvent } from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import styles from './Grade.module.scss'
import { AppRootStateType, useAppSelector } from '../../App/store'
import { useSelector } from 'react-redux'

export const Grade: React.FC<GradeType> = ({ id }) => {
  const card = useSelector((store: AppRootStateType) => store.cardList.cards.filter(c => c._id === id))
  console.log(card[0].grade)
  return (
    <div className={styles.gradeWrapper}>
      <div className={styles.grade}>
        <Box>
          <Rating value={card[0].grade} precision={0.5} />
        </Box>
      </div>
    </div>
  )
}

type GradeType = {
  id: string
}
