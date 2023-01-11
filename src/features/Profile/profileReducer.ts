import {Dispatch} from "redux";
import axios from "axios";
import {AppThunk} from "../../App/store";
import {updateUser} from "../Login/auth-api";


export type ProfileActionType =
    ReturnType<typeof setProfileAC>|
    ReturnType<typeof updateUsersDataAC>


const initState = {
    _id: "",
    email: "test email",
    name: "set your name",
    token:"",
    avatar: "",
}
export type InitStateType = typeof initState
export const profileReducer = (state = initState, action: ProfileActionType): InitStateType => {
    switch (action.type) {
        case 'SET-PROFILE':
return {...state,_id:action._id,email:action.email,name:action.name,avatar:action.avatar,}
        case 'UPDATE-USERS_DATA':
            return {...state,name:action.name,avatar:action.avatar,}
        default:
            return state
    }
}

export const setProfileAC = (_id: string, email: string, name: string,token:string,avatar: string) => ({
    type: 'SET-PROFILE',
    _id,
    email,
    name,
    token,
    avatar,
}as const)

 const updateUsersDataAC = ( name: string, avatar: string) => ({
    type: 'UPDATE-USERS_DATA',
    name,
    avatar,
}as const)

export const updateUsersDataTC = (name:string,avatar?:string): AppThunk=>(dispatch)=>{
    updateUser.updateUsersData(name,avatar)
        .then((res)=>{
            const {name,avatar,...rest} = res.data.updatedUser
            dispatch(updateUsersDataAC(name,avatar))
        })

}


//
// export const fetchProfileTC =(name:string)=> async (dispatch:Dispatch)=>{
//    const data = await profileApi.changeName(name)
//
// }
// export const profileApi = {
// changeName(name:string,avatar?:string){
//     return instance.put('auth/me',{name,avatar})
// }
// }
