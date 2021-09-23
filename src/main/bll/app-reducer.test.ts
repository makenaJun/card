import {appReducer, InitialAppStateType, setAppError, setAppStatus} from './app-reducer';

let startState: InitialAppStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null
    }
})

describe('App reducer', () => {
    it('App Status should be change', () => {
        const action = setAppStatus('success');

        const endState = appReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState.status).toBe('success');
    });

    it('Error should be seated', () => {
        const action = setAppError('Some Error');

        const endState = appReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState.error).toBe('Some Error');
    });
})