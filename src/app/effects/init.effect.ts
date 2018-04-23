import { Store, Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '../store/actions/authentication.actions';
import * as fromUserFiles from '../store/actions/userfiles.actions';
import { FileService } from '../components/file-management/services/getfiles.service';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { UserFile } from '../interfaces/files.interface';
import { tap } from 'rxjs/operators/tap';
import { exhaustMap } from 'rxjs/operators/exhaustMap';
import { of } from 'rxjs/observable/of';
@Injectable()
export class InitEffect {
    @Effect()
    signIn$ = this.action$
    .pipe(
        ofType(fromAuth.AuthActionTypes.SIGNIN),
        map((action: fromAuth.SignIn) => action.payload.user),
        switchMap(user => this.fileService.getFiles(user)),
        exhaustMap((filesArray: [UserFile[]]) => of({
                type: fromUserFiles.UserFilesActionTypes.SETUSERFILES,
                payload: filesArray
            })
        )
    );
    constructor(private action$: Actions, private fileService: FileService) {}
}



