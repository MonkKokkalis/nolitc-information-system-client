import { Action } from '@ngrx/store';
import { AuthInfo } from '../../interfaces/ngrx.interface';

export enum AuthActionTypes {
    SIGNIN = '[Authentication] SignIn',
    SIGNOUT = '[Authentication] SignOut'
}

export class SignIn implements Action {
    readonly type = AuthActionTypes.SIGNIN;
    constructor(public payload: AuthInfo) {}
}

export class SignOut implements Action {
    readonly type = AuthActionTypes.SIGNOUT;
}

export type AuthActions = SignIn | SignOut;

