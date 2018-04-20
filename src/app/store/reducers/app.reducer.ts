import { createSelector,
    createFeatureSelector,
    ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './authentication.reducer';

export interface AppState {
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
    auth: fromAuth.reducer
};

export const selectAuth = createFeatureSelector<fromAuth.State>('auth');
export const selectAuthUser = createSelector(selectAuth, fromAuth.getUser);

