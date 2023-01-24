import { AppActionType, AppRootStateType, AppThunk } from '../../App/store'
import { AddCardsPack, PackType, packsAPI, ParamsListPacksType, ResponseTypePacksList, UpdatePackType } from '../../api/api-packsList'
import { addPackType } from '../PackList/PackList-reducer'
import { AddCardType, cardsAPI, CardType, LearnCardType, ParamsCardsListType } from '../../api/api-cardsList'

export type InitialStateType = {
  cards: CardType[]
  setIsLoggedInCards: boolean
}

export const initialState: InitialStateType = {
  cards: [],
  setIsLoggedInCards: false,
}

export const CardListReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
  switch (action.type) {
    case 'CARD/SET-CARDS':
      console.log(action.cards)
      return { ...state, cards: action.cards }

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
    default:
      return state
  }
}
//action
export const setCardsAC = (cards: CardType[]) => ({ type: 'CARD/SET-CARDS', cards } as const)
export const addCardsAC = (newCard: CardType) => ({ type: 'CARD/ADD-CARDS', newCard } as const)
export const deleteCardsAC = (id: string) => ({ type: 'CARD/DELETE-CARDS', id } as const)
export const updateCardsAC = (updatedCard: CardType, id: string) => ({ type: 'CARD/UPDATE-CARDS', updatedCard, id } as const)
export const setIsLoggedInCardsAC = (value: boolean) => ({ type: 'CARD/SET-IS-LOGGED-IN-CARDS', value } as const)
const gradeCardUpdateAC = (grade: number, id: string) => ({ type: 'CARD/GRADE-UPDATE', grade, id } as const)
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

export type updateCardType = Partial<{
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
}>
export const updateCardTC =
  (card: CardType): AppThunk =>
  dispatch => {
    cardsAPI.createCard(card as updateCardType).then(res => {
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
