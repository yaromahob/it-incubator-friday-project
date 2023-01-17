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
export type ResponseTypePacksList = {
  cardPacks: CardPackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
}
export type CardPackType = {
  user_id: string
  user_name: string
  name: string
  private: boolean
  path: string
  grade: number
  shots: number
  cardsCount: number
  deckCover: string
  type: string
  rating: number
  more_id: string
  _id: string
  created: string
  updated: string
  __v: number
}
export type AddCardsPack = {
  cardsPack: {
    name?: string // если не отправить будет таким
    deckCover?: string // не обязателен
    private?: boolean // если не отправить будет такой
  }
}
export type UpdatePackType = {
  cardsPack: {
    _id: string
    name?: string
  }
}
export type DeletePackType = {
  _id: string
  user_id: string
  user_name: string
  name: string
  private: boolean
  path: string
  grade: number
  shots: number
  cardsCount: number
  deckCover: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}

export type ResponseUpdateType = {
  updatedCardsPack: CardPackType
  token: string
  tokenDeathTime: number
}
export type ResponseTypeNewCardsPack = {
  newCardsPack: CardPackType
  token: string
  tokenDeathTime: number
}

export type ResponseDeletedCardsPackType = {
  deletedCardsPack: DeletePackType
  token: string
  tokenDeathTime: number
}
export const packsAPI = {
  setPacks(params?: ParamsListPacksType) {
    return instance.get<ResponseTypePacksList>(`cards/pack`, {
      params: {
        packName: params?.packName,
        min: params?.min,
        max: params?.max,
        sortPacks: params?.sortPacks,
        page: params?.page,
        pageCount: params?.pageCount,
        user_id: params?.user_id,
      },
    })
  },
  addPack(data: AddCardsPack) {
    return instance.post<ResponseTypeNewCardsPack>(`cards/pack`, data)
  },
  deletePack(id: string) {
    return instance.delete<ResponseDeletedCardsPackType>(`cards/pack?id=${id}`)
  },
  createPack(data: UpdatePackType) {
    return instance.put<ResponseUpdateType>(`cards/pack`, { data })
  },
}
