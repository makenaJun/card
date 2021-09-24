const initialState = {
    status: 'idle' as ResponseStatusType,
    error: null as null | string,
}

export const appReducer = (state: InitialAppStateType = initialState, action: ActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'cards/app/SET-APP-STATUS':
        case 'cards/app/SET-APP-ERROR':
            return {
                ...state,
                ...action.payload,
            }
        case 'cards/app/CLEAN-UP-STATE':
            return {
                ...state,
                status: 'idle',
                error: null,
            }
        default:
            return state;
    }
}

// ACTIONS
export const setAppStatus = (status: ResponseStatusType) => ({
    type: 'cards/app/SET-APP-STATUS',
    payload: {status},
} as const);

export const setAppError = (error: string | null) => ({
    type: 'cards/app/SET-APP-ERROR',
    payload: {error},
} as const);

export const cleanUpState = () => ({
    type: 'cards/app/CLEAN-UP-STATE',
} as const);

//TYPES

export type ResponseStatusType = 'idle' | 'loading' | 'success' | 'failed';

export type InitialAppStateType = typeof initialState;

export type SetAppStatusActionsType = ReturnType<typeof setAppStatus>;
export type SetAppErrorActionsType = ReturnType<typeof setAppError>;

type ActionsType = SetAppStatusActionsType | SetAppErrorActionsType | ReturnType<typeof cleanUpState>



