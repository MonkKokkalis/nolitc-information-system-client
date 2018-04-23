import { UserFile } from '../../interfaces/files.interface';
import { UserFilesActionTypes } from '../actions/userfiles.actions';
import * as actions from '../actions/userfiles.actions';

export interface State {
    userFilesArray: [UserFile[]];
    arrayPointer: number;
}

export const initialState: State = {
    userFilesArray: null,
    arrayPointer: 0
};

export function reducer(state = initialState, action: actions.UserFilesActions) {
    switch (action.type) {
        case UserFilesActionTypes.SETUSERFILES: {
            return {
                ...state, userFilesArray: action.payload
            };
        }
        case UserFilesActionTypes.SETARRAYPOINTER: {
            return {
                ...state, arrayPointer: state.arrayPointer += action.payload
            };
        }
        case UserFilesActionTypes.RESETARRAYPOINTER: {
            return {
                ...state, arrayPointer: 0
            };
        }
        default: return state;
    }
}

export const getUserFilesArray = (state: State) => state.userFilesArray;
export const getArrayPointer = (state: State) => state.arrayPointer;
