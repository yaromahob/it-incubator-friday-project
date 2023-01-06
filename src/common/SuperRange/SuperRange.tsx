import React from 'react'

import Slider, { SliderProps } from '@mui/material/Slider'

const SuperRange: React.FC<SliderProps> = props => {
  return (
    <Slider
      sx={{
        // стили для слайдера // пишет студент
        color: '#00CC22',
        '& .MuiSlider-rail': {
          color: '#8B8B8B',
        },
        '& .MuiSlider-thumb': {
          color: '#fff',

          border: '2px solid #00CC22',
        },
        '& .MuiSlider-thumb:after': {
          width: '6px',
          height: '6px',
          top: '50%',
          left: '50%',
          backgroundColor: '#00CC22',
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

export default SuperRange
