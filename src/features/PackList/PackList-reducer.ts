import { AppThunk } from 'App/store'
import { AddCardsPack, packsAPI, PackType, ParamsListPacksType, ResponseTypePacksList, UpdatePackType } from 'api/api-packsList'
import dayjs from 'dayjs'
import { sortByDateAC } from 'App/app-reducer'

export type InitialStateType = {
  cardPacks: PackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  isDisabled: boolean
  userId: string
  searchedText: string
  textNewPack: string
  deckCoverForAdd: string
  idEditPack: string
  isPrivateNewPack: boolean
  isOpenModalNewPack: boolean
  isOpenModalEditPack: boolean
  isOpenModalDeletePack: boolean
}

export const initialState: InitialStateType = {
  cardPacks: [],
  page: 1,
  pageCount: 4,
  cardPacksTotalCount: 2,
  minCardsCount: 0,
  maxCardsCount: 4,
  isDisabled: false,
  userId: '',
  searchedText: '',
  textNewPack: '',
  deckCoverForAdd: '',
  idEditPack: '',
  isPrivateNewPack: false,
  isOpenModalNewPack: false,
  isOpenModalEditPack: false,
  isOpenModalDeletePack: false,
}

export const PackListReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS':
      const changeTimeFormat = action.data.cardPacks.map(pack => {
        return {
          ...pack,
          deckCover: pack.deckCover ? pack.deckCover : '',
          created: dayjs(pack.created).format('DD.MM.YYYY HH:mm:ss'),
          updated: dayjs(pack.updated).format('DD.MM.YYYY HH:mm:ss'),
        }
      })
      return { ...state, ...action.data, cardPacks: changeTimeFormat }

    case 'PACKS/ADD-PACKS':
      return {
        ...state,
        cardPacks: [
          ...state.cardPacks,
          {
            ...action.newCardsPack,
            created: dayjs(action.newCardsPack.created).format('DD.MM.YYYY HH:mm:ss'),
            updated: dayjs(action.newCardsPack.updated).format('DD.MM.YYYY HH:mm:ss'),
          },
        ],
      }
    case 'PACKS/DELETE-PACKS':
      return { ...state, cardPacks: state.cardPacks.filter(e => e._id !== action.idPack) }
    case 'PACKS/DISABLE-BUTTON':
      return { ...state, isDisabled: action.isDisabled }
    case 'PACKS/SET-OPEN-MODAL-NEW-PACK': {
      return { ...state, isOpenModalNewPack: action.value }
    }
    case 'PACKS/SET-OPEN-MODAL-EDIT-PACK':
      return { ...state, isOpenModalEditPack: action.value }
    case 'PACKS/SET-OPEN-MODAL-DELETE-PACK':
      return { ...state, isOpenModalDeletePack: action.value }
    case 'PACKS/SET-TEXT-NEW-PACK':
      return { ...state, textNewPack: action.text }
    case 'PACKS/SET-IS-PRIVATE-NEW-PACK':
      return { ...state, isPrivateNewPack: action.value }
    case 'PACKS/SET-ID-EDIT-PACK':
      return { ...state, idEditPack: action.id }
    case 'PACKS/SET-COVER-NEW-PACK':
      return { ...state, deckCoverForAdd: action.cover }
    case 'PACKS/UPDATE-PACKS':
      return {
        ...state,
        cardPacks: [...state.cardPacks].map(pack =>
          pack._id === action.data._id
            ? {
                ...pack,
                name: action.data.name,
                deckCover: action.data.deckCover,
              }
            : pack
        ),
      }
    case 'PACKS/SET_USERID':
      return { ...state, userId: action.userId }

    case 'PACKS/SEARCH-BY-TEXT':
      return { ...state, searchedText: action.value }

    default:
      return state
  }
}
//action
export const setPacksAC = (data: ResponseTypePacksList) => ({ type: 'PACKS/SET-PACKS', data } as const)
export const addPackAC = (newCardsPack: PackType) => ({ type: 'PACKS/ADD-PACKS', newCardsPack } as const)
export const deletePackAC = (idPack: string) => ({ type: 'PACKS/DELETE-PACKS', idPack } as const)
export const disableButtonAC = (isDisabled: boolean) => ({ type: 'PACKS/DISABLE-BUTTON', isDisabled } as const)
export const updatePackAC = (data: PackType) => ({ type: 'PACKS/UPDATE-PACKS', data } as const)
export const setUserIdAC = (userId: string) => ({ type: 'PACKS/SET_USERID', userId } as const)

export const searchTextAC = (value: string) => ({ type: 'PACKS/SEARCH-BY-TEXT', value } as const)
export const textNewPackAC = (text: string) => ({ type: 'PACKS/SET-TEXT-NEW-PACK', text } as const)
export const isPrivateNewPackAC = (value: boolean) => ({ type: 'PACKS/SET-IS-PRIVATE-NEW-PACK', value } as const)
export const setOpenModalNewPackAC = (value: boolean) => ({ type: 'PACKS/SET-OPEN-MODAL-NEW-PACK', value } as const)
export const setOpenModalEditPackAC = (value: boolean) => ({ type: 'PACKS/SET-OPEN-MODAL-EDIT-PACK', value } as const)
export const setOpenModalDeletePackAC = (value: boolean) => ({ type: 'PACKS/SET-OPEN-MODAL-DELETE-PACK', value } as const)
export const idEditPackAC = (id: string) => ({ type: 'PACKS/SET-ID-EDIT-PACK', id } as const)
export const deckCoverForAddAC = (cover: string) => ({ type: 'PACKS/SET-COVER-NEW-PACK', cover } as const)

// thunk
export const clearFilterTC = (): AppThunk => dispatch => {
  dispatch(disableButtonAC(true))
  packsAPI
    .setPacks({
      sortPacks: '0updated',
      page: 1,
      pageCount: 4,
      user_id: '',
    })
    .then(res => {
      dispatch(setPacksAC(res.data))
      dispatch(setUserIdAC(''))
      dispatch(sortByDateAC('0'))
      dispatch(disableButtonAC(false))
    })
}

export const setPackTC =
  (data?: ParamsListPacksType): AppThunk =>
  dispatch => {
    dispatch(disableButtonAC(true))
    packsAPI.setPacks(data).then(res => {
      dispatch(setPacksAC(res.data))
      dispatch(searchTextAC(''))
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
  | ReturnType<typeof disableButtonAC>
  | ReturnType<typeof setUserIdAC>
  | ReturnType<typeof sortByDateAC>
  | ReturnType<typeof searchTextAC>
  | ReturnType<typeof textNewPackAC>
  | ReturnType<typeof isPrivateNewPackAC>
  | ReturnType<typeof setOpenModalNewPackAC>
  | ReturnType<typeof setOpenModalEditPackAC>
  | ReturnType<typeof setOpenModalDeletePackAC>
  | ReturnType<typeof idEditPackAC>
  | ReturnType<typeof deckCoverForAddAC>
