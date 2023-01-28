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
