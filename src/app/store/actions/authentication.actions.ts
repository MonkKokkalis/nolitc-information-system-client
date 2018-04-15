import { Action } from '@ngrx/store';
import { AuthInfo } from '../../interfaces/ngrx.interface';

export const SIGNIN = 'SIGNIN';

export class SignIn implements Action {
    readonly type = SIGNIN;
    constructor(public payload: AuthInfo) {}
}

export type AuthActions = SignIn;
