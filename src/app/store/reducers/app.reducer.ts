import { createSelector,
    createFeatureSelector,
    ActionReducerMap } from '@ngrx/store';

import * as fromAuth from './authentication.reducer';
import * as fromUserFiles from './userfiles.reducer';
import { UserFile } from '../../interfaces/files.interface';

export interface AppState {
    auth: fromAuth.State;
    userFiles: fromUserFiles.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.reducer,
    userFiles: fromUserFiles.reducer
};

export const selectAuth = createFeatureSelector<fromAuth.State>('auth');
export const selectAuthUser = createSelector(selectAuth, fromAuth.getUser);

export const selectUserFiles =
    createFeatureSelector<fromUserFiles.State>('userFiles');
export const selectUserFilesArray =
    createSelector(selectUserFiles, fromUserFiles.getUserFilesArray);
export const selectArrayPointer =
    createSelector(selectUserFiles, fromUserFiles.getArrayPointer);
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

// export const selectLeftArrowVisible =
//     createSelector(
//         selectUserFilesArray,
//         selectArrayPointer,
//         (userFilesArra: [UserFile[]], arrayPointer: number) => {

//         }
//     )
