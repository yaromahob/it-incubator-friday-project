import axios from "axios";
import recoveryPassword from "../RecoveryPassword/RecoveryPassword";
import exp from "constants";

const instance = axios.create({
     baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
    headers: {

    }
})

type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}
export type recoveryPasswordType={
    email:string
    from:string
    message:string
}
export type  LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
type ResponseTypeRecoveryPassword={
    info:string,
    error:string
}
export type newPasswordType={
    password: string,
    resetPasswordToken: string
}
export type ResponseNewPassword={
    info:string,
    error: string
}
export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post<ResponseType>(`auth/login`, data);
    },
    recoveryPassword(data:recoveryPasswordType) {
        return axios.post<ResponseTypeRecoveryPassword>(`https://neko-back.herokuapp.com/2.0/auth/forgot`, data)
    },
    newPassword(data:newPasswordType){
        return axios.post<ResponseNewPassword>(`https://neko-back.herokuapp.com/2.0/auth/set-new-password`,data)
    },
        logout (){
            return instance.delete(`auth/me`,{});
        },

    me(){
        return  instance.post(`auth/me`,{})
    },
}
export const updateUserApi = {
    updateUsersData(name:string,avatar?:string){
        return instance.put('auth/me',{name,avatar})
    }
}