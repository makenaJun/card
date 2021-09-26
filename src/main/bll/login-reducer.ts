import {setAppError, SetAppErrorActionsType, setAppStatus, SetAppStatusActionsType} from './app-reducer';
import {validateEmail} from '../helpers/validate';
import {ForgotRequestDataType, loginApi, LoginParamsType, LoginResponseType} from '../dal/login-api';
import {mailMessageData} from '../helpers/mailMessageGen';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './store';
import {handlerAppError} from '../helpers/responseProcessing';

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

export const isAuth = (): ThunkDispatchType => async (dispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await loginApi.authMe();
        dispatch(successLoginAC(res.data, true));
        dispatch(setAppStatus('success'));

    } catch (error) {
        handlerAppError(error, dispatch);
    }
}
export const login = (data: LoginParamsType): ThunkDispatchType => async (dispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await loginApi.login(data);
        dispatch(successLoginAC(res.data, true));
        dispatch(setAppStatus('success'));

    } catch (error) {
        handlerAppError(error, dispatch);
    }
}

export const logout = (): ThunkDispatchType => async (dispatch) => {

    try {
        dispatch(setAppStatus('loading'));
        await loginApi.logout();
        dispatch(successLogoutAC(false))
        dispatch(setAppStatus('success'));

    } catch (error) {
        handlerAppError(error, dispatch);
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
        } catch (error) {
            handlerAppError(error, dispatch);
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
        } catch (error) {
            handlerAppError(error, dispatch);
        }
    }
}

//TYPES
export type ActionTypes = ReturnType<typeof successLoginAC> | ReturnType<typeof successLogoutAC>

export type InitialLoginStateType = typeof initialState;

type ForThunksActionsTypes = ActionTypes | SetAppStatusActionsType | SetAppErrorActionsType

type ThunkDispatchType = ThunkAction<Promise<void>, AppStateType, unknown, ForThunksActionsTypes>