import { Action } from '@ngrx/store';
import { AuthInfo } from '../../interfaces/ngrx.interface';

export enum AuthActionTypes {
    SETUSER = '[Authentication] SetUser',
    SIGNIN = '[Authentication] SignIn',
    SIGNOUT = '[Authentication] SignOut'
}

export class SetUser implements Action {
    readonly type = AuthActionTypes.SETUSER;
    constructor(public payload: AuthInfo) {}
}

export class SignIn implements Action {
    readonly type = AuthActionTypes.SIGNIN;
    constructor(public payload: {username: string, password: string}) {}
}

export class SignOut implements Action {
    readonly type = AuthActionTypes.SIGNOUT;
}

export type AuthActions = SetUser | SignIn | SignOut;

