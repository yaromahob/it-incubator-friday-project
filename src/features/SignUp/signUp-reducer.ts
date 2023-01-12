import { signUpAPI, SignUpData } from '../../api/signUp-API'
import axios from 'axios'
import { setAppError } from '../../App/app-reducer'
import {AppDispatch, AppThunk} from "../../App/store";
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
  (dispatch) => {
    signUpAPI
      .register(data)
      .then(res => {
        if (res.status === 201) {
          dispatch(signUpAC(true))
        }
      })
      .catch(e => {
        if (axios.isAxiosError(e)) {
          const error = e.response ? e.response.data.error : e.message
          dispatch(setAppError(error))
        }
      })
  }

// types
export type SignUpType = typeof initialState

export type SignUpActionsType = ReturnType<typeof signUpAC>
