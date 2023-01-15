import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../App/store'
import { Pack } from '../Pack'
import { addPackTC, setPackTC } from './PackList-reducer'

const PacksList = () => {
  const dispatch = useAppDispatch()
  const pack = useAppSelector(state => state.packList.cardPacks)
  const userId = useAppSelector(state => state.profile._id)

  useEffect(() => {
    // if (userId) {
    dispatch(setPackTC({ user_id: userId, block: false }))
    // }
  }, [userId])

  const addPack = () => {
    dispatch(addPackTC({ cardsPack: { name: 'no Name', private: false, deckCover: '' } }))
  }
  return (
    <div>
      <div>
        <button onClick={addPack}>addPack</button>
      </div>
      {pack.map(p => {
        return <Pack key={p._id} pack={p} />
      })}
    </div>
  )
}

export default PacksList
