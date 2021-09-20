import {ThunkType} from "./store"
import {herokuAPI, RegisterParamsType, RegisterResponseType, ResponseRegistrationErrorType} from "../../api/Api"

const initState = {
    isLogin: false,
    error: ""
}

export const registrationReducer = (state: InitialStateType = initState, action: ActionRegistrationTypes) => {
    switch (action.type) {
        case "SET_ERROR___REGISTRATION_PAGE": {
            return {
                ...state,
                error: action.error
            }
        }
        case "IS_REGISTRATION_SUCCESS___REGISTRATION_PAGE": {
            return {
                ...state,
                isLogin: action.isLogin
            }
        }
        default: {
            return state
        }
    }
}

export const changeRegistrationStatus = (isLogin: boolean) => {
    return {
        type: "IS_REGISTRATION_SUCCESS___REGISTRATION_PAGE",
        isLogin
    } as const
}

export const setErrorRegistration = (error: string) => {
    return {
        type: "SET_ERROR___REGISTRATION_PAGE",
        error
    } as const
}

export const registration = (regData: RegisterParamsType): ThunkType =>
    async (dispatch) => {
        let res: RegisterResponseType | ResponseRegistrationErrorType = await herokuAPI.authRegister(regData)
        if (res.error) {
            dispatch(setErrorRegistration(res.error? res.error: "Something wrong"))
            dispatch(changeRegistrationStatus(false))
        } else {
            dispatch(changeRegistrationStatus(true))
        }

    }

export type RegistrationStatusType = ReturnType<typeof changeRegistrationStatus>
export type SetErrorRegistrationType = ReturnType<typeof setErrorRegistration>

export type InitialStateType = typeof initState
export type ActionRegistrationTypes = RegistrationStatusType
    | SetErrorRegistrationType