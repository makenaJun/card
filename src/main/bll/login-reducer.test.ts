import {InitialLoginStateType, loginReducer, successLoginAC, successLogoutAC} from './login-reducer';

let startState: InitialLoginStateType;

beforeEach(() => {
    startState = {
        data: {
            _id: '',
            avatar: undefined,
            created: new Date(),
            updated: new Date(),
            email: '',
            name: '',
            isAdmin: false,
            publicCardPacksCount: 0,
            rememberMe: false,
            verified: false,
            error: undefined,
        },
        isAuth: false,
    }
})

describe('Login Reducer', () => {
    it('User information should be set in state', () => {
        const testData = {
            created: new Date(),
            email: "test@mail.com",
            isAdmin: false,
            name: "test",
            publicCardPacksCount: 0,
            rememberMe: true,
            updated: new Date(),
            verified: true,
            _id: "6148ac25cf6471000418",
        };

        const action = successLoginAC(testData, true);

        const endState = loginReducer(startState, action);

        expect(endState).not.toBe(startState);
        expect(endState.data.name).toBe('test');
        expect(endState.data.email).toBe('test@mail.com');
        expect(endState.isAuth).toBeTruthy();
    });
    it('Is auth should be false', () => {
        startState.isAuth = true;

        const action = successLogoutAC(false);

        const endState = loginReducer(startState, action);

        expect(endState).not.toBe(startState);
        expect(endState.isAuth).toBeFalsy();
    })
})