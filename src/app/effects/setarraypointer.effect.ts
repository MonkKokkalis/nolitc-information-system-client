import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromUserFiles from '../store/actions/userfiles.actions';
import { switchMap } from 'rxjs/operators/switchMap';
import { of } from 'rxjs/observable/of';
@Injectable()
export class SetArrayPointerEffect {
    @Effect()
    setArrayPointer$ = this.action$.pipe(
        ofType(fromUserFiles.UserFilesActionTypes.SETARRAYPOINTER),
        switchMap(() =>
            of({
                    type:  fromUserFiles.UserFilesActionTypes.SETSELECTEDINDEX,
                    payload: 0
            })
        )
    );
    constructor(private action$: Actions) {}
}
