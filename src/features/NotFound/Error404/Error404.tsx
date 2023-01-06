import React from 'react'

import error404 from '../../../assets/svg/404.svg'

import s from './Error404.module.css'
const Error404 = () => {
  return (
    <div id={'hw5-page-404'}>
      <div className={s.wrapper}>
        <img src={error404} alt={'404'} className={s.error404} />
      </div>
    </div>
  )
}

export default Error404
