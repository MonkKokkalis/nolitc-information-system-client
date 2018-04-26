import { Action } from '@ngrx/store';

export enum ErrorActionTypes {
    SETAUTHERROR = '[Error] AuthError',
    RESETAUTHERROR = '[Error] ResetAuthError',
    SETUSERFILESERROR = '[Error] SetUserFilesError'
}

export class SetAuthError implements Action {
    readonly type = ErrorActionTypes.SETAUTHERROR;
    constructor(public payload: string) {}
}

export class SetUserFilesError implements Action {
    readonly type = ErrorActionTypes.SETUSERFILESERROR;
    constructor(public payload: string) {}
}

export class ResetAuthError implements Action {
    readonly type = ErrorActionTypes.RESETAUTHERROR;
}

export type ErrorActions = SetAuthError | ResetAuthError | SetUserFilesError;
