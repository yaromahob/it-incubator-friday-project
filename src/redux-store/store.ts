import {TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {combineReducers, legacy_createStore } from 'redux'
import {ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducer } from './reducers/authReducer'

const rootReducer = combineReducers({
  auth: authReducer,
})

export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>
// создаем тип диспатча который принимает как AC так и TC
export const useAppDispatch = ()=> useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// TodolistActionType | TaskActionType | loginActionType |appActionType;
export type AppActionType = any

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>