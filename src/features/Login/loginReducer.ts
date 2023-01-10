import {AppThunk} from "../../App/store";
import {authAPI, LoginParamsType} from "./auth-api";

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
                }
                // dispatch(setAppStatusAC('succeeded'))
        })
        .catch ((e)=> {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
           // dispatch(setAppError(error))
        })
}

export const logoutTC = (): AppThunk => (dispatch) => {

}

export type AuthActionType = ReturnType<typeof setIsLoggedInAC>

