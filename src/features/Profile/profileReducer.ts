import { AppThunk } from 'App/store'
import { updateUserApi, UpdateUserType } from 'api/api-auth'

import { setAppError } from 'App/app-reducer'
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

export const setProfileAC = (_id: string, email: string, name: string, token: string, avatar: string) =>
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
  (data: UpdateUserType): AppThunk =>
  dispatch => {
    updateUserApi
      .updateUsersData(data)
      .then(res => {
        console.log(res)
        //const { name, avatar } = res.data.updatedUser
        dispatch(updateUsersDataAC(res.data.updatedUser.name, res.data.updatedUser.avatar))
        dispatch(headerSetNameAC(res.data.updatedUser.name))
      })
      .catch(e => {
        const error = e.response ? e.response.data.error : e.message + ', more details in the console'
        dispatch(setAppError(error))
      })
  }
