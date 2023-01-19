import React from 'react'
import { useAppSelector } from '../../App/store'

export const CardsContainer = () => {
  const cards = useAppSelector(state => state.cardList.cards)
  return <div></div>
}
