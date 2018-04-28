import * as fromComponentSate from '../actions/componentstate.actions';

export interface State {
    alertText: string;
    alertHidden: boolean;
}

const initialState: State = {
    alertText: '',
    alertHidden: true
};

export function reducer(state = initialState, action: fromComponentSate.ComponentActions) {
    switch (action.type) {
        case fromComponentSate.ComponentActionTypes.SETALERTTEXT:
            return {
                ...state, alertText: action.payload
            };
        case fromComponentSate.ComponentActionTypes.SHOWALERT:
            return {
                ...state, alertHidden: !state.alertHidden
            };
        default: return state;
    }
}

export const getAlertHidden = (state: State) => state.alertHidden;
export const getAlertText = (state: State) => state.alertText;
