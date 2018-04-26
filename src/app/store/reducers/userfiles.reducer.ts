import { UserFile } from '../../interfaces/files.interface';
import { UserFilesActionTypes } from '../actions/userfiles.actions';
import * as actions from '../actions/userfiles.actions';

export interface State {
    userFilesArray: [UserFile[]];
    arrayPointer: number;
    selectedArrayIndex: number;
}

export const initialState: State = {
    userFilesArray: null,
    arrayPointer: 0,
    selectedArrayIndex: 0
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
        case UserFilesActionTypes.SETSELECTEDINDEX: {
            return {
                ...state, selectedArrayIndex: action.payload
            };
        }
        default: return state;
    }
}

export const getUserFilesArray = (state: State) => state.userFilesArray;
export const getArrayPointer = (state: State) => state.arrayPointer;
export const getSelectedArrayIndex = (state: State) => state.selectedArrayIndex;
