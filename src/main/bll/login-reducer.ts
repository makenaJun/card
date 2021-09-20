import {ThunkType} from "./store"
import {herokuAPI, LoginParamsType, LoginResponseType, ResponseLoginErrorType} from "../../api/Api"

const initialState = {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    publicCardPacksCount: 0,
    isAdmin: false,
    error: "",
}

export const loginReducer = (state: LoginStateType = initialState, action: ActionTypes): LoginStateType => {
    switch (action.type) {
        case "LOGIN_REDUCER___LOGIN_PAGE": {
            return {
                ...state,
                ...action.loginData
            }
        }
        case "LOGIN_REDUCER___SET_ERROR": {
            return {
                ...state,
                error: action.error
            }
        }
        default:
            return state
    }
}

//Actions
export const loginAC = (loginData: LoginStateType) => ({
        type: "LOGIN_REDUCER___LOGIN_PAGE",
        loginData
    } as const
)

export const setError = (error: string) => {
    return {
        type: "LOGIN_REDUCER___SET_ERROR",
        error
    } as const
}

export const login = (data: LoginParamsType): ThunkType =>
    async (dispatch) => {
        const res: LoginResponseType & ResponseLoginErrorType = await herokuAPI.authLogin(data)
        if (res.error) {
            dispatch(setError(res.error ? res.error: "Something wrong"))
        } else {
            dispatch(loginAC(res))
        }
    }

//Types
//export type LoginStateType = typeof initialState;
export type LoginStateType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    isAdmin: boolean
    error?: string
};

type LoginACType = ReturnType<typeof loginAC>
type SetErrorType = ReturnType<typeof setError>

export type ActionTypes = LoginACType | SetErrorType

