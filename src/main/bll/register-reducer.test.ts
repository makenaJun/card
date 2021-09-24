import {changeRegistrationStatus, InitialRegisterStateType, registrationReducer} from './register-reducer';


let startState: InitialRegisterStateType;

beforeEach(() => {
    startState = {
        isRegSuccess: false
    }
})

describe('App reducer', () => {
    it('Registration status should be change', () => {
        const action = changeRegistrationStatus(true);

        const endState = registrationReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState.isRegSuccess).toBeTruthy();
    });
})