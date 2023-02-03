import { AppDispatch } from './store'
import { apiAuth } from '../api/api-auth'
import { setProfileAC } from 'features/Profile/profileReducer'
import { setIsLoggedInAC } from 'features/Login/loginReducer'
import axios, { AxiosError } from 'axios'
import { headerSetNameAC } from 'features/Header/headerReducer'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  isInitialized: false,
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  entityStatus: 'idle',
  activeSortField: '',
  sortBy: '1',
  isAuth: false,
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType) => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      return { ...state, status: action.status }
    }
    case 'APP/SET-ERROR': {
      return { ...state, error: action.error }
    }
    case 'APP/SET-INITIALIZED': {
      return { ...state, isInitialized: action.value }
    }
    case 'APP/SET-IsAUTH': {
      return { ...state, isAuth: action.value }
    }
    case 'APP/SET-SORT-VALUE':
      return {
        ...state,
        activeSortField: action.sortField,
      }
    case 'APP/SORT-BY-DATE':
      console.log(action.sortBy)
      return { ...state, sortBy: action.sortBy }
    default: {
      return state
    }
  }
}

export const setInitialized = (value: boolean) => ({ type: 'APP/SET-INITIALIZED', value } as const)
export const setAppStatus = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)

export const setAppError = (error: null | string) => ({ type: 'APP/SET-ERROR', error } as const)

export const setAuthApi = (value: boolean) => ({ type: 'APP/SET-IsAUTH', value } as const)

export const setSortValueAC = (sortField: string) => ({ type: 'APP/SET-SORT-VALUE', sortField } as const)

export const sortByDateAC = (sortBy: string) => ({ type: 'APP/SORT-BY-DATE', sortBy } as const)

export const setAuthApiTC = () => async (dispatch: AppDispatch) => {
  try {
    const res = await apiAuth.me()
    const { _id, email, name, token, avatar, ...rest } = res.data

    dispatch(setProfileAC(_id, email, name, token, avatar))
    dispatch(headerSetNameAC(name))
    dispatch(setAuthApi(true))
    dispatch(setIsLoggedInAC(true))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message
      dispatch(setProfileAC('', '', '', '', ''))
      dispatch(setAuthApi(false))
      dispatch(setIsLoggedInAC(false))
      console.log(error)
    }
  }
}

export type SetStatusType = ReturnType<typeof setAppStatus>
export type SetErrorType = ReturnType<typeof setAppError>
export type SetInitialized = ReturnType<typeof setInitialized>
export type SetAuthApi = ReturnType<typeof setAuthApi>
// export type SetSortValue =

export type AppActionsType =
  | SetStatusType
  | SetErrorType
  | SetInitialized
  | SetAuthApi
  | ReturnType<typeof setSortValueAC>
  | ReturnType<typeof sortByDateAC>
