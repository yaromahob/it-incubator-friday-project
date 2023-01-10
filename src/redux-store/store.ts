import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducer } from './reducers/authReducer'
import { SignUpActionsType, signUpReducer } from '../features/SignUp/signUp-reducer'
import { StatusesActionsType, appReducer } from '../App/app-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  signUp: signUpReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))
// создаем тип диспатча который принимает как AC так и TC
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// types
// TodolistActionType | TaskActionType | loginActionType | appActionType
export type AppActionType = SignUpActionsType | StatusesActionsType
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppActionType
>
