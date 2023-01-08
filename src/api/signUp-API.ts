import { instance } from './instance'

export const signUpAPI = {
  register(data: SignUpData) {
    return instance.post<SignUpData>('/auth/register', { ...data })
  },
}

export type SignUpData = {
  email: string
  password: string
}
// export type SignUpResponce = {
//   _id: string
//   email: string
//   rememberMe: boolean
//   isAdmin: boolean
//   name: string
//   verified: boolean
//   publicCardPacksCount: number
//   created: string
//   updated: string
//   __v: number
// }
