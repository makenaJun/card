import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {ActionTypes, loginReducer} from './login-reducer';
import {appReducer} from './app-reducer';
import {ActionRegistrationTypes, registrationReducer} from './registerReducer'

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));


// Types
type ActionsType = ActionTypes | ActionRegistrationTypes
export type AppStateType = ReturnType<typeof rootReducer>;
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

//@ts-ignore
window.store = store.getState()