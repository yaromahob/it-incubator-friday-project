import { signUpAPI, SignUpData } from 'api/signUp-API'
import axios, { AxiosError } from 'axios'
import { setAppError, setAppStatus } from 'App/app-reducer'
import { AppThunk } from 'App/store'
import { handleServerNetworkError } from '../../utils/utils-error'
import { ErrorNames } from '../../api/api-packsList'

const initialState = {
  isSignUp: false as boolean,
}

export const signUpReducer = (state: SignUpType = initialState, action: SignUpActionsType) => {
  switch (action.type) {
    case 'REGISTRATION': {
      return { ...state, isSignUp: action.isSignUp }
    }
    default: {
      return state
    }
  }
}

// actions

export const signUpAC = (isSignUp: boolean) => {
  return {
    type: 'REGISTRATION',
    isSignUp,
  } as const
}

// thunks

export const signUpTC =
  (data: SignUpData): AppThunk =>
  dispatch => {
    dispatch(setAppStatus('loading'))
    signUpAPI
      .register(data)
      .then(res => {
        if (res.status === 201) {
          dispatch(signUpAC(true))
          dispatch(setAppStatus('succeeded'))
        }
      })
      .catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch, ErrorNames.ERRORLOGIN)
      })
  }

// types
export type SignUpType = typeof initialState

export type SignUpActionsType = ReturnType<typeof signUpAC>
