import {Dispatch} from 'redux';
import {cleanUpState} from '../bll/app-reducer';

export const cleanup = (dispatch: Dispatch) => {
    dispatch(cleanUpState());
}