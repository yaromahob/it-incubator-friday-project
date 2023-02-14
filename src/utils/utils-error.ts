import { ThunkDispatch } from 'redux-thunk'
import { setAppError, setAppStatus } from '../App/app-reducer'
import { AppActionType, AppRootStateType } from '../App/store'
import { AxiosError } from 'axios'

export const handleServerNetworkError = (e: any, dispatch: ThunkDispatch<AppRootStateType, unknown, AppActionType>, errMess?: string) => {
  /*  dispatch(setAppError(error.message ? error.message : 'Some error occurred'))
                dispatch(setAppStatus('succeeded'))*/
  const error = e.response ? e.response.data.error : errMess
  dispatch(setAppError(error))
  dispatch(setAppStatus('succeeded'))
}
