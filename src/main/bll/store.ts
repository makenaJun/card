import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {loginReducer} from './login-reducer';
import {appReducer} from './app-reducer';
import {registrationReducer} from './register-reducer'

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));


// Types
export type AppStateType = ReturnType<typeof rootReducer>;

//@ts-ignore
window.store = store.getState()