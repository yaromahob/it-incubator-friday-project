export type HeaderActionType =
    ReturnType<typeof headerSetNameAC>

const headerInitState = {
    name: "",
}
type HeaderInitStateType = typeof headerInitState

export const headerReducer = (state = headerInitState, action: HeaderActionType): HeaderInitStateType => {
    switch (action.type) {
        case "HEADER/SET-NAME":
            return {...state,name: action.name}
        default:
            return state
    }
}
export const headerSetNameAC = (name: string) => ({
    type: 'HEADER/SET-NAME',
    name
} as const)