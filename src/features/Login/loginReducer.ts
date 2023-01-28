import { AppActionType, AppThunk } from '../../App/store'
import { newPasswordType, recoveryPasswordType } from '../../api/api-auth'
import { setAppStatus, SetErrorType, SetStatusType } from '../../App/app-reducer'
import { apiAuth, LoginParamsType } from '../../api/api-auth'
import { setAppError, setAuthApi, setAuthApiTC } from '../../App/app-reducer'
import axios, { AxiosError } from 'axios'

const initialState: AuthStateType = {
  isLoggedIn: false,
  isRecoveryPassword: false,
  isNewPassword: false,
}
type AuthStateType = { isLoggedIn: boolean; isRecoveryPassword: boolean; isNewPassword: boolean }

export const loginReducer = (state: AuthStateType = initialState, action: AuthActionType): AuthStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'login/SET-VALUE':
      return { ...state, isRecoveryPassword: action.value }
    case 'login/NEW-PASSWORD':
      return { ...state, isNewPassword: action.value }
    default:
      return state
  }
}
//action
export const setIsLoggedInAC = (value: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', value } as const)
export const setIsLoggedInRecoveryPasswordAC = (value: boolean) => ({ type: 'login/SET-VALUE', value } as const)
export const newPasswordAC = (value: boolean) => ({ type: 'login/NEW-PASSWORD', value } as const)
//thunk
export const loginTC =
  (data: LoginParamsType): AppThunk =>
  dispatch => {
    apiAuth.login(data).then(res => {
      if (!res.data.error) {
        dispatch(setIsLoggedInAC(true))
      } else {
        if (res.data.error) {
          dispatch(setAppError(res.data.error))
        }
      }
      if (!res.data.error) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setAuthApiTC())
      }
    })
    // .catch(e => {
    //   if (axios.isAxiosError(e)) {
    //     const error = e.response ? e.response.data.error : e.message
    //     dispatch(setAppError(error))
    //   }
    // })
  }
export const recoveryPasswordTC =
  (data: recoveryPasswordType): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    apiAuth
      .recoveryPassword(data)
      .then(res => {
        if (!res.data.error) {
          dispatch(setIsLoggedInRecoveryPasswordAC(true))
          dispatch(setAppStatus('succeeded'))
        } else {
          if (res.data.error) dispatch(setAppError(res.data.error))
        }
      })
      .catch(e => {
        if (axios.isAxiosError(e)) {
          const error = e.response ? e.response.data.error : e.message
          dispatch(setAppError(error))
          dispatch(setAppStatus('succeeded'))
        }
      })
  }
export const newPasswordTC =
  (data: newPasswordType): AppThunk =>
  dispatch => {
    apiAuth
      .newPassword(data)
      .then(res => {
        if (!res.data.error) {
          dispatch(newPasswordAC(true))
        }
      })
      .catch(e => {
        if (axios.isAxiosError(e)) {
          const error = e.response ? e.response.data.error : e.message
          dispatch(setAppError(error))
        }
      })
  }

export const logoutTC = (): AppThunk => async dispatch => {
  try {
    const res = await apiAuth.logout()
    dispatch(setIsLoggedInAC(false))
    dispatch(setAuthApi(false))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? err.response.data.error : err.message
      dispatch(setAppError(error))
    } else {
      dispatch(setAppError(`Native error ${err.message}`))
    }
  }
}

export type AuthActionType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setIsLoggedInRecoveryPasswordAC>
  | ReturnType<typeof newPasswordAC>
  | SetErrorType
  | SetStatusType
