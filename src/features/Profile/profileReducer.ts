import { AppThunk } from 'App/store'
import { updateUserApi, UpdateUserType } from 'api/api-auth'

import { setAppError, setAppStatus } from 'App/app-reducer'
import { headerSetNameAC } from '../Header/headerReducer'
import { AxiosError } from 'axios'
import { handleServerNetworkError } from '../../utils/utils-error'
import { ErrorNames } from '../../api/api-packsList'

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
    dispatch(setAppStatus('loading'))
    updateUserApi
      .updateUsersData(data)
      .then(res => {
        console.log(res)
        //const { name, avatar } = res.data.updatedUser
        dispatch(updateUsersDataAC(res.data.updatedUser.name, res.data.updatedUser.avatar))
        dispatch(headerSetNameAC(res.data.updatedUser.name))
        dispatch(setAppStatus('succeeded'))
      })
      .catch((e: AxiosError) => {
        handleServerNetworkError(e, dispatch, ErrorNames.ERRORLOGIN)
      })
  }
