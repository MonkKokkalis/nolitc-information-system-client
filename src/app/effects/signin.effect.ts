import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromAuth from '../store/actions/authentication.actions';
import * as fromUserFiles from '../store/actions/userfiles.actions';
import * as fromError from '../store/actions/error.actions';
import { FileService } from '../components/file-management/services/file.service';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { concatMap } from 'rxjs/operators/concatMap';
import { of } from 'rxjs/observable/of';
import { SignInInfo, AuthInfo, User } from '../interfaces/ngrx.interface';
import { AuthenticationService } from '../services/authentication.service';
import { catchError } from 'rxjs/operators/catchError';
import { HttpErrorResponse } from '@angular/common/http';
import { concat } from 'rxjs/observable/concat';

@Injectable()
export class SignInEffect {
    @Effect()
    signIn$ = this.action$
        .pipe(
            ofType(fromAuth.AuthActionTypes.SIGNIN),
            map((action: fromAuth.SignIn) => action.payload),
            switchMap((signInInfo: SignInInfo) =>
                this.authService.signIn(
                    { username: signInInfo.username, password: signInInfo.password }
                )
                    .pipe(
                        map((authInfo: AuthInfo) => ({ user: authInfo.user, token: authInfo.token })),
                        concatMap((user: AuthInfo) => [
                            { type: fromAuth.AuthActionTypes.SETUSER, payload: user },
                            { type: fromError.ErrorActionTypes.RESETAUTHERROR },
                            { type: fromUserFiles.UserFilesActionTypes.INITFILES, payload: user.user }
                        ]
                        ),
                        catchError((error: HttpErrorResponse) => of({
                            type: fromError.ErrorActionTypes.SETAUTHERROR,
                            payload: error.error.message
                        })),
                )
            )
        );
    constructor(private action$: Actions, private fileService: FileService,
        private authService: AuthenticationService) { }
}
