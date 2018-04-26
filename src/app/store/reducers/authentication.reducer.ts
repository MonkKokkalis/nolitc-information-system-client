import { AuthenticationState } from '../../interfaces/ngrx.interface';
import { AuthActionTypes } from '../actions/authentication.actions';
import * as authActions from '../actions/authentication.actions';

export interface State extends AuthenticationState {
    user: {
        username: string;
        type: string;
        firstname: string,
        lastname: string
    };
    token: string;
}

export const initialState: State = {
    user: null,
    token: null
};

export function reducer(state = initialState, action: authActions.AuthActions) {
    switch (action.type) {
        case AuthActionTypes.SETUSER:
            return {
                ...state, user: action.payload.user, token: action.payload.token
            };
        case AuthActionTypes.SIGNOUT:
            return {
                ...state, user: null, token: null
            };
        default: return state;
    }
}

export const getUser = (state: State) => state.user;
export const getToken = (state: State) => state.token;
