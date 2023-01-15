import { AppThunk } from '../../App/store'
import axios from 'axios'
import { setAppError } from '../../App/app-reducer'
import { packListAPI } from './packList-api'

const initialState: CardPackDataType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 0,
  pageCount: 0,
  token: '',
  tokenDeathTime: 0,
}

export const PackListReducer = (
  state: CardPackDataType = initialState,
  action: PacksListActionsType
) => {
  switch (action.type) {
    case 'PACKS/GET_PACKS':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

// actions

export const getPacksAC = (data: CardPackDataType) => {
  return {
    type: 'PACKS/GET_PACKS',
    payload: data,
  } as const
}

// thunks

export const getPacksTC = (): AppThunk => dispatch => {
  packListAPI
    .getPack()
    .then(res => {
      dispatch(getPacksAC(res.data))
    })
    .catch(e => {
      if (axios.isAxiosError(e)) {
        const error = e.response ? e.response.data.error : e.message
        dispatch(setAppError(error))
      }
    })
}

// types

export type PacksListActionsType = ReturnType<typeof getPacksAC>

export type CardPackDataType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}

export type PackType = {
  cardsCount: number
  created: string
  deckCover: string
  grade: number
  more_id: string
  name: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  user_name: string
  __v: number
  _id: string
}

export type CardType = {}
