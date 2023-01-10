import {TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducer } from './reducers/authReducer'
import { SignUpActionsType, signUpReducer } from '../features/SignUp/signUp-reducer'
import { StatusesActionsType, appReducer } from '../App/app-reducer'
import {profileReducer} from "../features/Profile/profileReducer";

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  signUp: signUpReducer,
  profile:profileReducer,
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>


export const useAppDispatch =()=> useDispatch() as ThunkDispatch<AppRootStateType, unknown, AnyAction>
// const appDispatch = useAppDispatch() //todo
 export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


// // создаем тип диспатча который принимает как AC так и TC
// export const useAppDispatch = ()=> useDispatch<AppDispatch>()


//
// export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>