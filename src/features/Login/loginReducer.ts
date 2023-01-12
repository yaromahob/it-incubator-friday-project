import {AppThunk} from "../../App/store";
import {authAPI, LoginParamsType} from "./auth-api";
import {setAppError, setAuthApi, setAuthApiTC} from "../../App/app-reducer";
import axios, {AxiosError} from "axios";

const initialState: AuthStateType = {
    isLoggedIn: false
}
type AuthStateType = { isLoggedIn: boolean }

export const loginReducer = (state: AuthStateType = initialState, action: AuthActionType): AuthStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
//action
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunk
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {

    authAPI.login(data)
        .then((res) => {
            if (!res.data.error) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAuthApiTC())
            }
            // dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            // dispatch(setAppError(error))
        })
}

export const logoutTC = (): AppThunk => async (dispatch) => {
    try{
        const res = await authAPI.logout()
                dispatch(setIsLoggedInAC(false))
                dispatch(setAuthApi(false))
    }catch(e) {
        const err = e as Error | AxiosError<{ error: string }>
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? err.response.data.error : err.message
            dispatch(setAppError(error))
        } else {
            dispatch(setAppError(`Native error ${err.message}`))
        }

    }
}

export type AuthActionType = ReturnType<typeof setIsLoggedInAC>

