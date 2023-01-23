const initialState = {
  namePack: '',
  privatePack: false,
}

export const packCardCRUDReducer = (state: InitialStateType = initialState, action: PackCardCrudActionType) => {
  switch (action.type) {
    case 'PACK-CRUD/SET-NAME':
      return { ...state, namePack: action.text }
    case 'PACK-CRUD/SET-PRIVATE':
      return { ...state, privatePack: action.value }
    default:
      return state
  }
}

export const newPackNameAC = (text: string) => ({ type: 'PACK-CRUD/SET-NAME', text } as const)
export const newPackPrivateAC = (value: boolean) => ({ type: 'PACK-CRUD/SET-PRIVATE', value } as const)

type InitialStateType = typeof initialState
export type PackCardCrudActionType = ReturnType<typeof newPackNameAC> | ReturnType<typeof newPackPrivateAC>
