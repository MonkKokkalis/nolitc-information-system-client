import * as errorActions from '../actions/error.actions';

export interface State {
    authError: string;
}

export const initialState: State = {
    authError: null
};

export function reducer(state = initialState, action: errorActions.ErrorActions) {
    switch (action.type) {
        case errorActions.ErrorActionTypes.SETAUTHERROR:
            return {
                ...state, authError: action.payload
            };
        case errorActions.ErrorActionTypes.RESETAUTHERROR:
            return {
                ...state, authError: null
            };
        default: return state;
    }
}

export const getAuthError = (state: State) => state.authError;
