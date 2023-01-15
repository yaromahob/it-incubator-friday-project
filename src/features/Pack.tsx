import React from 'react'
import { CardPackType } from '../api/api-packsList'
import { useAppDispatch } from '../App/store'
import { deletePackTC } from './PacksList/PackList-reducer'

export type PackType = {
  pack: CardPackType
}
export const Pack = ({ pack }: PackType) => {
  const dispatch = useAppDispatch()
  const deletePack = () => {
    dispatch(deletePackTC(pack._id))
  }
  return (
    <div>
      <div>
        <div>{pack.name}</div>
        <button onClick={deletePack}>delete</button>
      </div>
      <div>{pack.cardsCount}</div>
      <div>{pack.updated}</div>
      <div>{pack.user_name}</div>
    </div>
  )
}
