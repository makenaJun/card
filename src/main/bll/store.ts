import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from "redux-thunk"
import {ActionTypes, loginReducer} from "./login-reducer"

const rootReducer = combineReducers({
    login: loginReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));


// Types
type ActionsType = ActionTypes
export type AppStateType = ReturnType<typeof rootReducer>;
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

//@ts-ignore
window.store = store.getState()