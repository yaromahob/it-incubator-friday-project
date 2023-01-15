import React from 'react'

import Slider, { SliderProps } from '@mui/material/Slider'

const SuperRange: React.FC<SliderProps> = props => {
  return (
    <Slider
      sx={{
        // стили для слайдера // пишет студент
        color: '#366EFF',
        '& .MuiSlider-rail': {
          color: '#99b5fc',
        },
        '& .MuiSlider-thumb': {
          color: '#fff',
          width: '14px',
          height: '14px',
          border: '3px solid #366EFF',
        },
      }}
      step={1}
      min={1}
      max={100}
      getAriaLabel={() => 'Temperature range'}
      {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
    />
  )
}

export default SuperRange;
