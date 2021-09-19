import {herokuAPI, LoginParamsType, LoginResponseType} from "../../api/Api";
import {Dispatch} from "redux";

//TYPES
type ActionType = ReturnType<typeof successLoginAC> | ReturnType<typeof failedLoginAC>
    | ReturnType<typeof successLogoutAC>

export type LoginStateType = {
    isAuth: boolean
    data: LoginResponseType
    error: string
}

const initialState = {} as LoginStateType

export const loginReducer = (state: typeof initialState = initialState, action: ActionType): LoginStateType => {
    switch (action.type) {
        case 'login/SUCCESS-LOGIN':
            return {...state, isAuth: action.isAuth, data: action.data,}
        case "login/FAILED-LOGIN":
            return {...state, isAuth: action.isAuth,}
        case 'login/SUCCESS-LOGOUT':
            return {...state, isAuth: action.isAuth,}
        default:
            return state
    }
}


//AC
const successLoginAC = (data: LoginResponseType, isAuth: boolean, errorMessage: string) => (
    {type: 'login/SUCCESS-LOGIN', data: {...data}, isAuth, errorMessage} as const
)

const failedLoginAC = (errorMessage: string | null, isAuth: boolean) => (
    {type: 'login/FAILED-LOGIN', errorMessage, isAuth} as const
)

const successLogoutAC = (isAuth: boolean) => ({type: 'login/SUCCESS-LOGOUT', isAuth} as const)

//THUNKS


export const isAuthTC = () => async (dispatch: Dispatch<ActionType>) => {
    herokuAPI.isAuth()
        .then(res => {
            dispatch(successLoginAC(res.data, true, ''))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ',error ');
            dispatch(failedLoginAC(error, false))
            console.log(error)
        })
}
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionType>) => {
    herokuAPI.login(data)
        .then(res => {
            dispatch(successLoginAC(res.data, true, ''))
            alert('login')
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', error');
            dispatch(failedLoginAC(error, false))
        })
}

export const logoutTC = () => (dispatch: Dispatch<ActionType>) => {
    herokuAPI.logout()
        .then(res => {
            dispatch(successLogoutAC(false))
            alert('logout')
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', error');
            dispatch(failedLoginAC(error, false))
        })
}