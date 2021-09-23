import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './store';
import {ForgotRequestDataType, loginApi} from '../dal/login-api';
import {mailMessageData} from '../helpers/mailMessageGen';
import {validateEmail} from '../helpers/validate';

const initialState = {
    status: 'idle' as ResponseStatusType,
    error: null as null | string,
}

export const appReducer = (state: InitialAppStateType = initialState, action: ActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'cards/app/SET-APP-STATUS':
        case 'cards/app/SET-APP-ERROR':
            return {
                ...state,
                ...action.payload,
            }
        case 'cards/app/CLEAN-UP-STATE':
            return {
                ...state,
                status: 'idle',
                error: null,
            }
        default:
            return state;
    }
}

// ACTIONS
export const setAppStatus = (status: ResponseStatusType) => ({
    type: 'cards/app/SET-APP-STATUS',
    payload: {status},
} as const);

export const setAppError = (error: string | null) => ({
    type: 'cards/app/SET-APP-ERROR',
    payload: {error},
} as const);

export const cleanUpState = () => ({
    type: 'cards/app/CLEAN-UP-STATE',
} as const);


// THUNKS

//TODO transfer this thunks in login reducer
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

export type ResponseStatusType = 'idle' | 'loading' | 'success' | 'failed';

export type InitialAppStateType = typeof initialState;

type ActionsType = ReturnType<typeof setAppStatus> | ReturnType<typeof setAppError> | ReturnType<typeof cleanUpState>

type ThunkDispatchType = ThunkAction<void, AppStateType, unknown, ActionsType>

