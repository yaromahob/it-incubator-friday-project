import { instance } from './instance'

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

export type ParamsListPacksType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: any
  page?: number
  pageCount?: number

  user_id?: string
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
    private?: boolean
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
