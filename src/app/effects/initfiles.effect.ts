import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromUserFiles from '../store/actions/userfiles.actions';
import * as fromError from '../store/actions/error.actions';
import { FileService } from '../components/file-management/services/file.service';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { User } from '../interfaces/ngrx.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { UserFile } from '../interfaces/files.interface';

import { _throw } from 'rxjs/observable/throw';
import { race } from 'rxjs/operators/race';
import { delay } from 'rxjs/operators/delay';
import { mapTo } from 'rxjs/operators/mapTo';
import { tap } from 'rxjs/operators/tap';
import { exhaustMap } from 'rxjs/operators';
@Injectable()
export class InitFilesEffect {
    @Effect()
    initfile$ = this.action$.pipe(
        ofType(fromUserFiles.UserFilesActionTypes.INITFILES),
        map((action: fromUserFiles.InitFiles) => action.payload),
        switchMap((user: User) => this.fileService.getFiles(user)
            .pipe(
                switchMap((filesArray: [UserFile[]]) => of({
                    type: fromUserFiles.UserFilesActionTypes.SETUSERFILES,
                    payload: filesArray
                })),
                catchError((error: HttpErrorResponse) => of({
                    type: fromError.ErrorActionTypes.SETUSERFILESERROR,
                    payload: error.error.message
                }))
            )
        )
    );

    constructor(private action$: Actions, private fileService: FileService) { }
}
