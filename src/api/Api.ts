import axios from "axios"

//use obj "process" for apply right url in depending with current brunch
const isDev = process.env.NODE_ENV === "development"

const settings = {
    withCredentials: true,
}
const instance = axios.create({
    baseURL: isDev ? "http://localhost:7542/2.0/" : "https://neko-back.herokuapp.com/2.0/",
    ...settings
})

//types

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
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

export type RegisterParamsType = {
    email: string,
    password: string,
}

export type RegisterResponseType = {
    addedUser: {},
    error?: string,
}

export type UserResponseType = {
    _id: string,
    email: string,
    name: string,
    avatar?: string,
    publicCardPacksCount: number,
    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean, //подтвердил ли почту
    rememberMe: boolean,
    error?: string,
}

export type ChangeNameDataType = {
    name: string,
    avatar: string
}

export type UnLoginResponseType = {
    info: string,
    error?: string, //в документации знака ? нету.
}

export type RecoveryDataType = {
    email: string, //кому восстанавливать
    from: string, // от? разработчика фронта ai73a@yandex.by
    message: string,
}

export type RecoveryResponseType = {
    info: string,
    error?: string
}

export type SendPasswordDataType = {
    password: string,
    resetPasswordToken: string
}

export type SendPasswordResponseType = {
    info: string,
    error?: string,
}

export type ResponseLoginErrorType = {
    error: string
    email: string
    in: string
}

export type ResponseRegistrationErrorType = {
    error: string
    in: string
    isEmailValid: boolean
    isPassValid: boolean
    passwordRegExp: string
}


// api

export const herokuAPI = {
    getPing() {
        let date = new Date().getTime()
        return instance.get(`ping? + frontTime=${date}`)
    },
    authLogin(data: LoginParamsType) {
        return instance.post<LoginResponseType | ResponseLoginErrorType>("auth/login", data)
            .then(res => res.data)
            .catch((e) => {
                return e.response.data
            })
    },
    authRegister(data: RegisterParamsType) {
        return instance.post<RegisterResponseType | ResponseRegistrationErrorType>("auth/register", data)
            .catch((e)=>{
            return e.response.data
        })
    },
    authMe() {
        return instance.post<UserResponseType>("auth/me")
    },
    changeNameAvatar(data: ChangeNameDataType) {
        return instance.put<UserResponseType>("auth/me", data)
    },
    unLogin() {
        return instance.delete<UnLoginResponseType>("auth/me") //types????
    },
    recovery(data: RecoveryDataType) {
        return instance.post<RecoveryResponseType>("auth/forgot", data)
    },
    sendPassword(data: SendPasswordDataType) {
        return instance.post<SendPasswordResponseType>("auth/set-new-password", data)
    },

}
