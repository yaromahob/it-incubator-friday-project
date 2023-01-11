import {AppDispatch} from "./store";
import {authAPI} from "../features/Login/auth-api";
import {setProfileAC} from "../features/Profile/profileReducer";
import {setIsLoggedInAC} from "../features/Login/loginReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  isInitialized: false,
  status: 'idle' as RequestStatusType,
  error: null as null | string,
  entityStatus: 'idle',
  isAuth:false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType) => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      return { ...state, status: action.status }
    }
    case 'APP/SET-ERROR': {
      return { ...state, error: action.error }
    }
    case 'APP/SET-INITIALIZED': {
      return { ...state, isInitialized: action.value }
    }
    case "APP/SET-IsAUTH":{
      return {...state,isAuth: true}
    }
    default: {
      return state
    }
  }
}

export const setInitialized = (value: boolean) => ({ type: 'APP/SET-INITIALIZED', value } as const)

export const setAppStatus = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status } as const)

export const setAppError = (error: null | string) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAuthApi = (value:boolean) => ({ type: 'APP/SET-IsAUTH'} as const)

export const setAuthApiTC = ()=>(dispatch:AppDispatch)=>{
  authAPI.me()
      .then((res)=>{
        if(res.status === 200){
          const {_id, email, name,token,avatar,...rest} = res.data
          dispatch(setProfileAC(_id,email,name,token,avatar))
          dispatch(setAuthApi(true))
          dispatch(  dispatch(setIsLoggedInAC(true)))
        }
      }).catch((err)=>{
    console.log(err)
  })
}

export type SetStatusType = ReturnType<typeof setAppStatus>
export type SetErrorType = ReturnType<typeof setAppError>
export type SetInitialized = ReturnType<typeof setInitialized>
export type SetAuthApi = ReturnType<typeof setAuthApi>

export type AppActionsType = SetStatusType | SetErrorType | SetInitialized|SetAuthApi
