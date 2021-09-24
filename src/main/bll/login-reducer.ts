import {setAppError, SetAppErrorActionsType, setAppStatus, SetAppStatusActionsType} from './app-reducer';
import {validateEmail} from '../helpers/validate';
import {ForgotRequestDataType, loginApi, LoginParamsType, LoginResponseType} from '../dal/login-api';
import {mailMessageData} from '../helpers/mailMessageGen';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './store';

const initialState = {
    isAuth: false,
    data: {} as LoginResponseType,
}

export const loginReducer = (state: InitialLoginStateType = initialState, action: ActionTypes): InitialLoginStateType => {
    switch (action.type) {
        case 'cards/login/SUCCESS-LOGIN':
            return {...state, isAuth: action.isAuth, data: action.data,}
        case 'cards/login/SUCCESS-LOGOUT':
            return {...state, isAuth: action.isAuth,}
        default:
            return state;
    }
}


//ACTIONS
export const successLoginAC = (data: LoginResponseType, isAuth: boolean) => (
    {type: 'cards/login/SUCCESS-LOGIN', data: {...data}, isAuth} as const
);
export const successLogoutAC = (isAuth: boolean) => ({type: 'cards/login/SUCCESS-LOGOUT', isAuth} as const);

//THUNKS

//TODO error handler function

export const isAuth = (): ThunkDispatchType => async (dispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await loginApi.authMe();
        dispatch(successLoginAC(res.data, true));
        dispatch(setAppStatus('success'));

    } catch (err: any) {
        const error = err.response ? err.response.data.error : (err.message + ', more details in the console');
        dispatch(setAppError(error));
        dispatch(setAppStatus('failed'));
    }
}
export const login = (data: LoginParamsType): ThunkDispatchType => async (dispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await loginApi.login(data);
        dispatch(successLoginAC(res.data, true));
        dispatch(setAppStatus('success'));

    } catch (err: any) {
        const error = err.response ? err.response.data.error : (err.message + ', more details in the console');
        dispatch(setAppError(error));
        dispatch(setAppStatus('failed'));
    }
}

export const logout = (): ThunkDispatchType => async (dispatch) => {

    try {
        dispatch(setAppStatus('loading'));
        await loginApi.logout();
        dispatch(successLogoutAC(false))
        dispatch(setAppStatus('success'));

    } catch (err: any) {
        const error = err.response ? err.response.data.error : (err.message + ', more details in the console');
        dispatch(setAppError(error));
        dispatch(setAppStatus('failed'));
    }
}

export const reminderPassword = (email: string): ThunkDispatchType => {
    return async (dispatch) => {
        try {
            if (validateEmail(email)) {

                dispatch(setAppStatus('loading'));
                dispatch(setAppError(null));

                const payload: ForgotRequestDataType = {
                    email,
                    from: mailMessageData.from,
                    message: mailMessageData.message,
                }
                await loginApi.forgot(payload);
                dispatch(setAppStatus('success'));
            } else {
                dispatch(setAppError('Not valid Email'));
            }
        } catch (err: any) {
            const error = err.response ? err.response.data.error : (err.message + ', more details in the console');
            dispatch(setAppError(error));
            dispatch(setAppStatus('failed'));
        }
    }
}

export const setNewPassword = (token: string, password: string): ThunkDispatchType => {
    return async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'));
            const payload = {
                password: password,
                resetPasswordToken: token,
            }
            await loginApi.setNewPassword(payload);
            dispatch(setAppStatus('success'));
        } catch (err: any) {
            const error = err.response ? err.response.data.error : (err.message + ', more details in the console');
            dispatch(setAppError(error));
            dispatch(setAppStatus('failed'));
        }
    }
}

//TYPES
export type ActionTypes = ReturnType<typeof successLoginAC> | ReturnType<typeof successLogoutAC>

export type InitialLoginStateType = typeof initialState;

type ForThunksActionsTypes = ActionTypes | SetAppStatusActionsType | SetAppErrorActionsType

type ThunkDispatchType = ThunkAction<Promise<void>, AppStateType, unknown, ForThunksActionsTypes>