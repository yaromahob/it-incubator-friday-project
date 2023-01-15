import {TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch } from 'redux-thunk'
import {AuthActionType, loginReducer} from '../features/Login/loginReducer'
import { SignUpActionsType, signUpReducer } from '../features/SignUp/signUp-reducer'
import { ProfileActionType, profileReducer } from '../features/Profile/profileReducer'
import { AppActionsType, appReducer } from './app-reducer'
import { HeaderActionType, headerReducer } from '../features/Header/headerReducer'
import { PackListReducer, PacksActionType } from '../features/PacksList/PackList-reducer'
import { PacksListActionsType } from '../features/PackList/packList-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  signUp: signUpReducer,
  profile: profileReducer,
  header: headerReducer,
  packList: PackListReducer,
  packsList: PackListReducer,
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppActionType = SignUpActionsType | ProfileActionType | AppActionsType | PacksListActionsType | HeaderActionType | AuthActionType | PacksActionType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>
