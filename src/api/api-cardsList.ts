import { updateCardType } from '../features/CardList/Card-reducer'
import { instance } from './instance'

export const cardsAPI = {
  setCards(params: ParamsCardsListType) {
    return instance.get<ResponseSetCardTyp>(`/cards/card`, {
      params,
    })
  },
  addCard(data: AddCardType) {
    return instance.post<ResponseAddCardType>(`/cards/card`, data)
  },
  deleteCard(id?: string) {
    return instance.delete<ResponseDeleteCardType>(`/cards/card`, { params: { id } })
  },
  createCard(card: updateCardType) {
    return instance.put<ResponseUpdateCardType>(`/cards/card`, card)
  },
  gradeUpdate(data: LearnCardType) {
    return instance.put<ResponseGradeUpdateCardType>(`/cards/grade`, data)
  },
}

export type ParamsCardsListType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: any
  page?: number
  pageCount?: number
}
export type AddCardType = {
  card: {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
  }
}

export type ResponseSetCardTyp = {
  cards: CardType[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: string
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  //minGrade: number
  //maxGrade: number
  token: string
  tokenDeathTime: number
}

export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  question: string
  answer: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
}

export type ResponseAddCardType = {
  newCard: CardType
  token: string
  tokenDeathTime: number
}
export type ResponseDeleteCardType = {
  deletedCard: CardType
  token: string
  tokenDeathTime: number
}
export type ResponseUpdateCardType = {
  updatedCard: CardType
  token: string
  tokenDeathTime: number
}

export type LearnCardType = {
  grade: number
  card_id: string
}

export interface UpdatedGrade {
  card_id: string
  user_id: string
  cardsPack_id: string
  grade: number
  shots: number
  more_id: string
  _id: string
  created: string
  updated: string
  __v: number
}

export interface ResponseGradeUpdateCardType {
  updatedGrade: UpdatedGrade
  token: string
  tokenDeathTime: number
}
