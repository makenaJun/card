const initialState = {}

export const loginReducer = (state: LoginStateType = initialState, action: ActionTypes): LoginStateType => {
    switch (action.type) {
        default:
            return state;
    }
}

//Actions
export const ActionCreator = () => ({type: 'ACTION'});

//Types
type LoginStateType = typeof initialState;

type ActionTypes = ReturnType<typeof ActionCreator>