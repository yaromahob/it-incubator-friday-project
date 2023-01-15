import { AppThunk } from '../../App/store'
import { updateUserApi } from '../../api/auth-api'

import { setAppError } from '../../App/app-reducer'
import { headerSetNameAC } from '../Header/headerReducer'

export type ProfileActionType =
  | ReturnType<typeof setProfileAC>
  | ReturnType<typeof updateUsersDataAC>
  | ReturnType<typeof changeUsersNameAC>

const initState = {
  _id: '',
  email: '',
  name: '',
  token: '',
  avatar: '',
}
export type InitStateType = typeof initState
export const profileReducer = (state = initState, action: ProfileActionType): InitStateType => {
  switch (action.type) {
    case 'SET-PROFILE':
      return {
        ...state,
        _id: action._id,
        email: action.email,
        name: action.name,
        avatar: action.avatar,
      }
    case 'UPDATE-USERS_DATA':
      return { ...state, name: action.name, avatar: action.avatar }
    case 'CHANGE-USERS_NAME':
      return { ...state, name: action.name }
    default:
      return state
  }
}

export const setProfileAC = (
  _id: string,
  email: string,
  name: string,
  token: string,
  avatar: string
) =>
  ({
    type: 'SET-PROFILE',
    _id,
    email,
    name,
    token,
    avatar,
  } as const)

const updateUsersDataAC = (name: string, avatar: string) =>
  ({
    type: 'UPDATE-USERS_DATA',
    name,
    avatar,
  } as const)
export const changeUsersNameAC = (name: string) =>
  ({
    type: 'CHANGE-USERS_NAME',
    name,
  } as const)

export const updateUsersDataTC =
  (name: string, avatar?: string): AppThunk =>
  dispatch => {
    updateUserApi
      .updateUsersData(name, avatar)
      .then(res => {
        const { name, avatar, ...rest } = res.data.updatedUser
        dispatch(updateUsersDataAC(name, avatar))
        dispatch(headerSetNameAC(name))
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : e.message + ', more details in the console'
        dispatch(setAppError(error))
      })
  }
