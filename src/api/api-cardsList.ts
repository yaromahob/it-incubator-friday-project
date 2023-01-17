import axios from 'axios'
import recoveryPassword from '../features/RecoveryPassword/RecoveryPassword'
import exp from 'constants'
import { updateCardType } from '../features/CardList/Card-reducer'

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})
export type ParamsCardsListType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min: number
  max: number
  sortCards: any
  page: number
  pageCount: number
}
export type AddCardType = {
  card: {
    cardsPack_id: string
    question?: string // если не отправить будет таким
    answer?: string // если не отправить будет таким
    grade?: number // 0..5, не обязателен
    shots?: number // не обязателен
    answerImg?: string // не обязателен
    questionImg?: string // не обязателен
    questionVideo?: string // не обязателен
    answerVideo?: string // не обязателен
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
  minGrade: number
  maxGrade: number
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
  __v: number
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
export const cardsAPI = {
  setCards(params?: ParamsCardsListType) {
    console.log(params)
    return instance.get<ResponseSetCardTyp>(`/cards/card`, {
      params,
    })
  },
  addCard(data: AddCardType) {
    return instance.post<ResponseAddCardType>(`/cards/card`)
  },
  deleteCard(id?: string) {
    return instance.delete<ResponseDeleteCardType>(`/cards/card${id}`)
  },
  createCard(card: updateCardType) {
    return instance.put<ResponseUpdateCardType>(`/cards/card`)
  },
}
