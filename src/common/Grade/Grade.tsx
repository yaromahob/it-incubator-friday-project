import React from 'react'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import styles from './Grade.module.scss'

export const Grade = () => {
  const [value, setValue] = React.useState<number | null>(2)
  return (
    <div className={styles.gradeWrapper}>
      <div className={styles.grade}>
        <Box>
          <Rating
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
            precision={0.5}
          />
        </Box>
      </div>
    </div>
  )
}

