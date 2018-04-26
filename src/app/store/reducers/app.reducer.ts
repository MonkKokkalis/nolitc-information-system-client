import { createSelector,
    createFeatureSelector,
    ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './authentication.reducer';
import * as fromUserFiles from './userfiles.reducer';
import * as fromError from './error.reducer';
import { UserFile } from '../../interfaces/files.interface';

export interface AppState {
    auth: fromAuth.State;
    userFiles: fromUserFiles.State;
    stateError: fromError.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.reducer,
    userFiles: fromUserFiles.reducer,
    stateError: fromError.reducer
};

export const selectAuth = createFeatureSelector<fromAuth.State>('auth');
export const selectAuthUser = createSelector(selectAuth, fromAuth.getUser);

export const selectError = createFeatureSelector<fromError.State>('stateError');
export const selectAuthError = createSelector(selectError, fromError.getAuthError);

export const selectUserFiles =
    createFeatureSelector<fromUserFiles.State>('userFiles');
export const selectUserFilesArray =
    createSelector(selectUserFiles, fromUserFiles.getUserFilesArray);
export const selectArrayPointer =
    createSelector(selectUserFiles, fromUserFiles.getArrayPointer);
export const selectArrayIndex =
    createSelector(selectUserFiles, fromUserFiles.getSelectedArrayIndex);
export const selectFilesArraySlice =
    createSelector(
        selectUserFilesArray,
        selectArrayPointer,
        (userFilesArray: [UserFile[]], arrayPointer: number) => {
            if (userFilesArray) {
                return userFilesArray.slice(arrayPointer, arrayPointer + 5);
            } else { return []; }
        }
    );

export const selectRighttArrowVisible =
    createSelector(
        selectUserFilesArray,
        selectArrayPointer,
        (userFilesArray: [UserFile[]], arrayPointer: number) => {
            if (userFilesArray.slice(arrayPointer + 5, arrayPointer + 10 ).length < 1) {
                return true;
            } else { return false; }
        }
    );

export const selectCurrentArray =
    createSelector(
        selectFilesArraySlice,
        selectArrayIndex,
        (selectedFilesArraySlice: [UserFile[]], selectedArrayIndex: number) => {
            return selectedFilesArraySlice[selectedArrayIndex];
        }
    );
