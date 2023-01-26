import axios from 'axios'
import recoveryPassword from '../features/RecoveryPassword/RecoveryPassword'
import exp from 'constants'

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})
export type ParamsListPacksType = {
  packName?: string // не обязательно
  min?: number // не обязательно
  max?: number // не обязательно
  sortPacks?: any // не обязательно
  page?: number // не обязательно
  pageCount?: number // не обязательно

  user_id?: string // чьи колоды не обязательно, или придут все
  block?: boolean
}
export type PackType = {
  user_id: string
  user_name: string
  name: string
  private: boolean
  // path: string
  //grade: number
  //shots: number
  cardsCount: number
  deckCover: string
  //type: string
  //rating: number
  //more_id: string
  _id: string
  created: string
  updated: string
  //__v: number
}
export type AddCardsPack = {
  cardsPack: {
    name?: string
    deckCover?: string
    private?: boolean
  }
}
export type UpdatePackType = {
  cardsPack: {
    _id: string
    name?: string
  }
}

export type ResponseUpdateType = {
  updatedCardsPack: PackType
  token: string
  tokenDeathTime: number
}
export type ResponseTypeNewCardsPack = {
  newCardsPack: PackType
  token: string
  tokenDeathTime: number
}

export type ResponseDeletedCardsPackType = {
  deletedCardsPack: PackType
  token: string
  tokenDeathTime: number
}
export type ResponseTypePacksList = {
  cardPacks: PackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
}
export const packsAPI = {
  setPacks(params?: ParamsListPacksType) {
    return instance.get<ResponseTypePacksList>(`cards/pack`, { params })
  },
  addPack(data: AddCardsPack) {
    return instance.post<ResponseTypeNewCardsPack>(`cards/pack`, data)
  },
  deletePack(id: string) {
    return instance.delete<ResponseDeletedCardsPackType>(`cards/pack?id=${id}`)
  },
  createPack(data: UpdatePackType) {
    return instance.put<ResponseUpdateType>(`cards/pack`, data)
  },
}
