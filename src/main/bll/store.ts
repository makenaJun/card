import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {loginReducer} from './login-reducer';
import {appReducer} from './app-reducer';

const rootReducer = combineReducers({
    login: loginReducer,
    app: appReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));


// Types
export type AppStateType = ReturnType<typeof rootReducer>;