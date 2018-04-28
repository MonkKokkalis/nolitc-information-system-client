import { createSelector,
    createFeatureSelector,
    ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './authentication.reducer';
import * as fromUserFiles from './userfiles.reducer';
import * as fromError from './error.reducer';
import * as fromComponentState from './componentstate.reducer';
import * as fromFileUpload from './fileupload.reducer';
import { UserFile } from '../../interfaces/files.interface';

export interface AppState {
    auth: fromAuth.State;
    userFiles: fromUserFiles.State;
    stateError: fromError.State;
    componentState: fromComponentState.State;
    fileUpload: fromFileUpload.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.reducer,
    userFiles: fromUserFiles.reducer,
    stateError: fromError.reducer,
    componentState: fromComponentState.reducer,
    fileUpload: fromFileUpload.reducer
};

export const selectFileUpload =
    createFeatureSelector<fromFileUpload.State>('fileUpload');
export const selectFileUploadState = createSelector(selectFileUpload,
    fromFileUpload.getFileUploadState);
export const selectUploadWindowVisibility =
    createSelector(selectFileUpload, fromFileUpload.getWindowVisibility);
export const selectFilesForUpload =
    createSelector(selectFileUpload, fromFileUpload.getFilesForUpload);

export const selectComponentState =
    createFeatureSelector<fromComponentState.State>('componentState');
export const selectComponentVisibility = createSelector(selectComponentState,
    fromComponentState.getAlertHidden);
export const selectAlertText = createSelector(selectComponentState,
    fromComponentState.getAlertText);

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
