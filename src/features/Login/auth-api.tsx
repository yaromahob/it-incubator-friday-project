import axios from "axios";

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

export type  LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post<ResponseType>(`auth/login`, data);
    },
    logout (){
        return instance.delete(`auth/login`);
    },
    me(){
        return  instance.get(`auth/me`)
    },
}
