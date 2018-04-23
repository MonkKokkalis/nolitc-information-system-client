import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import * as fromUserFiles from '../store/actions/userfiles.actions';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators/switchMap';
@Injectable()
export class SetArrayEffect {
    @Effect()
    setArray$ = this.action$.pipe(
        ofType(fromUserFiles.UserFilesActionTypes.SETUSERFILES),
        switchMap(() => of({
            type: fromUserFiles.UserFilesActionTypes.RESETARRAYPOINTER
        }))
    );

    constructor(private action$: Actions) {}
}
