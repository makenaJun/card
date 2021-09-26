import {setAppError, SetAppErrorActionsType, setAppStatus, SetAppStatusActionsType} from '../bll/app-reducer';
import {Dispatch} from 'redux';

export const handlerAppError = (err: any, dispatch: Dispatch<SetAppStatusActionsType | SetAppErrorActionsType>) => {
    const error = err.response ? err.response.data.error : (err.message + ', more details in the console');
    dispatch(setAppError(error));
    dispatch(setAppStatus('failed'));
};
