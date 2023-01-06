import { ActionsType } from '../actions/authActions'

const initialState: AuthStateType = {}

export const authReducer = (state: AuthStateType = {}, action: ActionsType): AuthStateType => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

// types

type AuthStateType = {}
