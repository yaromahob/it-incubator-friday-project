import { AppActionType, AppThunk } from '../../App/store'
import { AddCardsPack, CardPackType, packsAPI, ParamsListPacksType, ResponseTypePacksList, UpdatePackType } from '../../api/api-packsList'
//import {   PacksListType } from '../../api/api-packsList'

export type InitialStateType = {
  cardPacks: CardPackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  isDisabled: boolean
  cardsCount: Array<number>
}
export const initialState = {
  cardPacks: [],
  page: 1, //выбранная стр
  pageCount: 4, //ко-во стр
  cardPacksTotalCount: 2, // количество колод
  minCardsCount: 0,
  maxCardsCount: 4,
  isDisabled: false,
  cardsCount: [1, 30],
}

export const PackListReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS':
      return { ...state, ...action.data }
    case 'PACKS/ADD-PACKS':
      return { ...state, cardPacks: [...state.cardPacks, action.newCardsPack] }
    case 'PACKS/DELETE-PACKS':
      return { ...state, cardPacks: [...state.cardPacks].filter(e => e._id !== action.idPack) }
    case 'PACKS/DISABLE-BUTTON':
      return { ...state, isDisabled: action.isDisabled }
    case 'PACKS/SET-CARDS-COUNT':
      return { ...state, cardsCount: [...action.cardsCount] }
    case 'PACKS/UPDATE-PACKS':
      return { ...state, cardPacks: [...state.cardPacks].map(e => (e._id === action.data._id ? { ...e, name: action.data.name } : e)) }
    default:
      return state
  }
}
//action
export const setPacksAC = (data: ResponseTypePacksList) => ({ type: 'PACKS/SET-PACKS', data } as const)
export const addPackAC = (newCardsPack: CardPackType) => ({ type: 'PACKS/ADD-PACKS', newCardsPack } as const)
export const deletePackAC = (idPack: string) => ({ type: 'PACKS/DELETE-PACKS', idPack } as const)
export const disableButtonAC = (isDisabled: boolean) => ({ type: 'PACKS/DISABLE-BUTTON', isDisabled } as const)
export const setCardsCountAC = (cardsCount: number[]) => ({ type: 'PACKS/SET-CARDS-COUNT', cardsCount } as const)
export const updatePackAC = (data: CardPackType) => ({ type: 'PACKS/UPDATE-PACKS', data } as const)

// thunk
export const setPackTC =
  (data?: PacksListType): AppThunk =>
  dispatch => {
    dispatch(disableButtonAC(true))
    packsAPI.setPacks(data).then(res => {
      dispatch(setPacksAC(res.data))
      dispatch(disableButtonAC(false))
    })
  }
export const addPackTC =
  (data: AddCardsPack): AppThunk =>
  dispatch => {
    packsAPI.addPack(data).then(res => {
      dispatch(addPackAC(res.data.newCardsPack))
    })
  }
export const deletePackTC =
  (id: string): AppThunk =>
  dispatch => {
    packsAPI.deletePack(id).then(res => {
      dispatch(deletePackAC(res.data.deletedCardsPack._id))
    })
  }

export const updatePackTC =
  (data: UpdatePackType): AppThunk =>
  dispatch => {
    packsAPI.createPack(data).then(res => {
      dispatch(updatePackAC(res.data.updatedCardsPack))
    })
  }

export type addPackType = ReturnType<typeof addPackAC>
export type PacksActionType =
  | ReturnType<typeof setPacksAC>
  | addPackType
  | ReturnType<typeof deletePackAC>
  | ReturnType<typeof updatePackAC>
|  ReturnType<typeof disableButtonAC>
    | ReturnType<typeof setCardsCountAC>
