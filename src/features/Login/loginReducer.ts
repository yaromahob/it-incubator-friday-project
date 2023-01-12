import {AppThunk} from "../../App/store";
import {authAPI, LoginParamsType, newPasswordType, recoveryPasswordType} from "./auth-api";
import axios from "axios";
import {setAppError, setAppStatus, SetErrorType, SetStatusType} from "../../App/app-reducer";

const initialState: AuthStateType = {
    isLoggedIn: false,
    isRecoveryPassword: false,
    isNewPassword: false
}
type AuthStateType = { isLoggedIn: boolean, isRecoveryPassword: boolean, isNewPassword: boolean }

export const loginReducer = (state: AuthStateType = initialState, action: AuthActionType): AuthStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        case "login/SET-VALUE":
            return {...state, isRecoveryPassword: action.value}
        case "login/NEW-PASSWORD":
            return {...state, isNewPassword: action.value}
        default:
            return state
    }
}
//action
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsLoggedInRecoveryPasswordAC = (value: boolean) => ({type: 'login/SET-VALUE', value} as const)
export const newPasswordAC = (value: boolean) => ({type: 'login/NEW-PASSWORD', value} as const)
//thunk
export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    authAPI.login(data)
        .then((res) => {
            if (!res.data.error) {
                dispatch(setIsLoggedInAC(true))
            } else {
                if (res.data.error) {
                    dispatch(setAppError(res.data.error))
                }
            }
        })
        .catch(e => {
            if (axios.isAxiosError(e)) {
                const error = e.response ? e.response.data.error : e.message
                dispatch(setAppError(error))
            }
        })
}
export const recoveryPasswordTC = (data: recoveryPasswordType): AppThunk => (dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.recoveryPassword(data)
        .then((res) => {
            if (!res.data.error) {
                dispatch(setIsLoggedInRecoveryPasswordAC(true))
                dispatch(setAppStatus('succeeded'))
            }else{
                if(res.data.error)
                dispatch(setAppError(res.data.error))
            }
        }).catch(e => {
        if (axios.isAxiosError(e)) {
            const error = e.response ? e.response.data.error : e.message
            dispatch(setAppError(error))
            dispatch(setAppStatus('succeeded'))
        }
    })
}
export const newPasswordTC = (data: newPasswordType): AppThunk => (dispatch) => {
    authAPI.newPassword(data)
        .then((res) => {
            if (!res.data.error) {
                dispatch(newPasswordAC(true))
            }
        }).catch(e => {
        if (axios.isAxiosError(e)) {
            const error = e.response ? e.response.data.error : e.message
            dispatch(setAppError(error))
        }
    })
}


export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsLoggedInRecoveryPasswordAC>
    | ReturnType<typeof newPasswordAC>
    | SetErrorType
    | SetStatusType