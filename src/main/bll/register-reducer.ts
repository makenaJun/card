import {setAppError, SetAppErrorActionsType, setAppStatus, SetAppStatusActionsType} from './app-reducer';
import {loginApi, RegisterParamsType} from '../dal/login-api';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './store';

const initState = {
    isRegSuccess: false,
}

export const registrationReducer = (state: InitialRegisterStateType = initState, action: ActionRegistrationTypes): InitialRegisterStateType => {
    switch (action.type) {
        case 'cards/registration/IS-REGISTRATION-SUCCESS':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const changeRegistrationStatus = (isRegSuccess: boolean) => {
    return {
        type: 'cards/registration/IS-REGISTRATION-SUCCESS',
        payload: {isRegSuccess}
    } as const
}

export const registration = (data: RegisterParamsType): ThunkDispatchType =>
    async (dispatch) => {
        try {
            dispatch(setAppStatus('loading'))
            await loginApi.registration(data);
            dispatch(changeRegistrationStatus(true));
            dispatch(setAppStatus('success'));
        } catch (err: any) {
            const error = err.response ? err.response.data.error : (err.message + ', more details in the console');
            dispatch(setAppError(error));
            dispatch(setAppStatus('failed'));
        }
    }
export type InitialRegisterStateType = typeof initState;

export type ActionRegistrationTypes = ReturnType<typeof changeRegistrationStatus>

type ForThunksActionsTypes = ActionRegistrationTypes | SetAppStatusActionsType | SetAppErrorActionsType
type ThunkDispatchType = ThunkAction<Promise<void>, AppStateType, unknown, ForThunksActionsTypes>