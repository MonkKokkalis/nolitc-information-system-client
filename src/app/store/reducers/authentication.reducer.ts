import { AuthenticationState } from '../../interfaces/ngrx.interface';
import * as actions from '../actions/authentication.actions';
const initialState: AuthenticationState =  {
    user: null,
    token: null
};

export function authenticationReducer(state = initialState, action: actions.AuthActions) {
    switch (action.type) {
        case actions.SIGNIN:
        return {
            ...state, user: action.payload.user, token: action.payload.token
        };
    }
}
