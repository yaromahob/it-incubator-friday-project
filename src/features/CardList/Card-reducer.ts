import { AppActionType, AppThunk } from '../../App/store'

import { AddCardType, cardsAPI, CardType, LearnCardType, ParamsCardsListType } from '../../api/api-cardsList'
import dayjs from 'dayjs'

export type InitialStateType = {
  cards: CardType[]
  setIsLoggedInCards: boolean
  openAddNewCardModal: boolean
  openEditCardModal: boolean
  openDeleteCardModal: boolean
  idEditCard: string
  questionFormat: 'Text' | 'Video'
  question: string
  answer: string
  addCardQuestionImg: string
  addCardAnswerImg: string
}

export const initialState: InitialStateType = {
  cards: [],
  setIsLoggedInCards: false,
  questionFormat: 'Text',
  question: '',
  answer: '',
  idEditCard: '',
  openAddNewCardModal: false,
  openEditCardModal: false,
  openDeleteCardModal: false,
  addCardQuestionImg: '',
  addCardAnswerImg: '',
}

export const CardListReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
  switch (action.type) {
    case 'CARD/SET-CARDS':
      return {
        ...state,
        cards: action.cards.map(card => {
          return {
            ...card,
            created: dayjs(card.created).format('DD.MM.YYYY HH:mm:ss'),
            updated: dayjs(card.updated).format('DD.MM.YYYY HH:mm:ss'),
          }
        }),
      }
    case 'CARD/ADD-CARDS':
      return { ...state, cards: [...state.cards!, action.newCard] }
    case 'CARD/DELETE-CARDS':
      return { ...state, cards: state.cards!.filter(c => c._id !== action.id) }
    case 'CARD/UPDATE-CARDS':
      return { ...state, cards: state.cards!.filter(c => (c._id === action.id ? { ...action.updatedCard } : c)) }
    case 'CARD/SET-IS-LOGGED-IN-CARDS':
      return { ...state, setIsLoggedInCards: action.value }
    case 'CARD/GRADE-UPDATE':
      return { ...state, cards: state.cards.filter(c => (c._id === action.id ? { ...c, grade: action.grade } : c)) }
    case 'CARD/QUESTION-UPDATE-TEXT':
      return { ...state, question: action.text }
    case 'CARD/ANSWER-UPDATE-TEXT':
      return { ...state, answer: action.text }
    case 'CARD/QUESTION-FORMAT':
      return { ...state, questionFormat: action.value }
    case 'CARD/OPEN-MODAL-ADD-NEW-CARD':
      return { ...state, openAddNewCardModal: action.value }
    case 'CARD/OPEN-MODAL-EDIT-CARD':
      return { ...state, openEditCardModal: action.value }
    case 'CARD/OPEN-MODAL-DELETE-CARD':
      return { ...state, openDeleteCardModal: action.value }
    case 'CARD/SET-ID-EDIT-CARD':
      return { ...state, idEditCard: action.id }
    case 'ADD-CARD-QUESTION-IMG':
      return { ...state, addCardQuestionImg: action.value }
    case 'ADD-CARD-ANSWER-IMG':
      return { ...state, addCardAnswerImg: action.value }
    default:
      return state
  }
}
//action
export const setCardsAC = (cards: CardType[]) => ({ type: 'CARD/SET-CARDS', cards } as const)
export const addCardsAC = (newCard: CardType) => ({ type: 'CARD/ADD-CARDS', newCard } as const)
export const deleteCardsAC = (id: string) => ({ type: 'CARD/DELETE-CARDS', id } as const)
export const updateCardsAC = (updatedCard: CardType, id: string) =>
  ({
    type: 'CARD/UPDATE-CARDS',
    updatedCard,
    id,
  } as const)
export const setIsLoggedInCardsAC = (value: boolean) => ({ type: 'CARD/SET-IS-LOGGED-IN-CARDS', value } as const)
export const gradeCardUpdateAC = (grade: number, id: string) => ({ type: 'CARD/GRADE-UPDATE', grade, id } as const)
export const openNewCardModalAC = (value: boolean) => ({ type: 'CARD/OPEN-MODAL-ADD-NEW-CARD', value } as const)
export const openEditCardModalAC = (value: boolean) => ({ type: 'CARD/OPEN-MODAL-EDIT-CARD', value } as const)
export const openDeleteCardModalAC = (value: boolean) => ({ type: 'CARD/OPEN-MODAL-DELETE-CARD', value } as const)
export const setQuestionValueAC = (text: string) => ({ type: 'CARD/QUESTION-UPDATE-TEXT', text } as const)
export const setAnswerValueAC = (text: string) => ({ type: 'CARD/ANSWER-UPDATE-TEXT', text } as const)
export const setIdEditCardAC = (id: string) => ({ type: 'CARD/SET-ID-EDIT-CARD', id } as const)
export const setFormatQuestionAC = (value: 'Text' | 'Video') => ({ type: 'CARD/QUESTION-FORMAT', value } as const)
export const addCardQuestionImgAC = (value: string) => ({ type: 'ADD-CARD-QUESTION-IMG', value } as const)
export const addCardAnswerImgAC = (value: string) => ({ type: 'ADD-CARD-ANSWER-IMG', value } as const)
// thunk
export const setCardTC =
  (data: ParamsCardsListType): AppThunk =>
  dispatch => {
    cardsAPI.setCards(data).then(res => {
      if (res.data) {
        dispatch(setCardsAC(res.data.cards))
      }
    })
  }
export const addCardTC =
  (data: AddCardType): AppThunk =>
  dispatch => {
    cardsAPI.addCard(data).then(res => {
      dispatch(addCardsAC(res.data.newCard))
    })
  }
export const deleteCardTC =
  (id?: string): AppThunk =>
  dispatch => {
    cardsAPI.deleteCard(id).then(res => {
      dispatch(deleteCardsAC(res.data.deletedCard._id))
    })
  }

export type updateCardType = {
  card: {
    _id: string
    cardsPack_id?: string
    user_id?: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    comments?: string
    type?: string
    rating?: number
    more_id?: string
    created?: string
    updated?: string
    __v?: number
  }
}
export const updateCardTC =
  (card: updateCardType): AppThunk =>
  dispatch => {
    cardsAPI.createCard(card).then(res => {
      dispatch(updateCardsAC(res.data.updatedCard, res.data.updatedCard._id))
    })
  }
export const gradeCardUpdateTC =
  (data: LearnCardType): AppThunk =>
  dispatch => {
    cardsAPI.gradeUpdate(data).then(res => {
      dispatch(gradeCardUpdateAC(res.data.updatedGrade.grade, res.data.updatedGrade.card_id))
    })
  }

export type CardsActionType =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof addCardsAC>
  | ReturnType<typeof deleteCardsAC>
  | ReturnType<typeof updateCardsAC>
  | ReturnType<typeof setIsLoggedInCardsAC>
  | ReturnType<typeof gradeCardUpdateAC>
  | ReturnType<typeof openDeleteCardModalAC>
  | ReturnType<typeof openNewCardModalAC>
  | ReturnType<typeof setQuestionValueAC>
  | ReturnType<typeof setAnswerValueAC>
  | ReturnType<typeof setFormatQuestionAC>
  | ReturnType<typeof setIdEditCardAC>
  | ReturnType<typeof openEditCardModalAC>
  | ReturnType<typeof addCardQuestionImgAC>
  | ReturnType<typeof addCardAnswerImgAC>
