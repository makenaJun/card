import {instance} from './api';

export const loginApi = {
    authMe() {
        return instance.post<LoginResponseType>('auth/me');
    },
    login(data: LoginParamsType) {
        return instance.post<LoginResponseType>('auth/login', data);
    },
    logout() {
        return instance.delete<ResponseType>('auth/me');
    },
    registration(payload: RegisterParamsType) {
        return instance.post<RegisterResponseType>('auth/register', payload);
    },
    forgot(payload: ForgotRequestDataType) {
        return instance.post<ResponseType>('auth/forgot', payload);
    },
    setNewPassword(payload: SetNewPassRequestDataType) {
        return instance.post<ResponseType>('auth/set-new-password', payload);
    },
}

// TYPES
export type ForgotRequestDataType = {
    email: string,
    from: string,
    message: string,
}

export type SetNewPassRequestDataType = {
    password: string,
    resetPasswordToken: string,
}

export type ResponseType = {
    info: string,
    error?: string
}

export type RegisterParamsType = {
    email: string,
    password: string,
    repeatPassword: string,
}

export type RegisterResponseType = {
    error?: string,
}

export type LoginResponseType = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
    error?: string,
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
