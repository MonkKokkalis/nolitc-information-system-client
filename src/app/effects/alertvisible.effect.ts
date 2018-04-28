import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as fromComponentState from '../store/actions/componentstate.actions';
import { switchMap } from 'rxjs/operators/switchMap';
import { concat } from 'rxjs/observable/concat';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators/delay';
@Injectable()
export class AlertVisibleEffect {
    @Effect()
    $alertVisible = this.action$.pipe(
        ofType(fromComponentState.ComponentActionTypes.SETALERTTEXT),
        switchMap((action: fromComponentState.ComponentActions) =>
            concat(
                of({type: fromComponentState.ComponentActionTypes.SHOWALERT}),
                of({ type: fromComponentState.ComponentActionTypes.SHOWALERT })
                    .pipe(delay(2000))
            )
        )
    );

    constructor(private action$: Actions) {}
}
