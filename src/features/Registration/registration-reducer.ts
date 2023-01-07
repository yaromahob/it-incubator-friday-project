import {ActionsType} from "../../redux-store/actions/authActions";

const initialState: RegistrationType = {
  email: '',
  password: ''
}

export const registrationReducer = (state: RegistrationType = initialState, action: ActionsType) => {
  switch (action.type) {
    case "REGISTRATION": {
      return {...state, ...action.userData}
    }
    default: { return state }
    
  }
}





// actions

export const registrationAC = (data: any) => {
  return {
    type: 'REGISTRATION',
    payload: data
  }
}


// types

export type RegistrationType = {
  email: string
  password: string
}