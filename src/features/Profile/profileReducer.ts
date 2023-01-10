import {Dispatch} from "redux";
import axios from "axios";


export type ProfileActionType =
    ReturnType<typeof getProfileAC>|
    ReturnType<typeof changeUsersDataAC>

export type InitStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: any;
}
const initState: InitStateType = {
    _id: "",
    email: "",
    name: "Pedro",
    avatar: null,
}

export const profileReducer = (state = initState, action: ProfileActionType): InitStateType => {
    switch (action.type) {
        case 'GET-PROFILE':
return {...state,_id:action._id,email:action.email,name:action.name,avatar:action.avatar,}
        case 'CHANGE-NAME':
            return {...state,name:action.name,avatar:action.avatar,}
        default:
            return state
    }
}

export const getProfileAC = (_id: string, email: string, name: string, avatar: string) => ({
    type: 'GET-PROFILE',
    _id,
    email,
    name,
    avatar,
}as const)

 const changeUsersDataAC = ( name: string, avatar: string) => ({
    type: 'CHANGE-NAME',
    name,
    avatar,
}as const)

export const changeUsersDataTC = (name:string,avatar?:string)=>(dispatch:Dispatch)=>{
    axios.put('http://localhost:7542/2.0/auth/me',{name,avatar},
        {withCredentials: true})
        .then((res)=>{
            const {name,avatar,...rest} = res.data.updatedUser
            dispatch(changeUsersDataAC(name,avatar))
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
