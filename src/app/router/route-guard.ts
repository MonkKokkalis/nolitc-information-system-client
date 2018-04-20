import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, ActivatedRouteSnapshot,
    RouterStateSnapshot, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthenticationState } from '../interfaces/ngrx.interface';
import { pluck, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import * as fromRoot from '../store/reducers/app.reducer';
@Injectable()
export class RouteGuard implements CanActivate {
    authState: Observable<AuthenticationState> = this.store.
        pipe(select(fromRoot.selectAuth));
    constructor(private store: Store<fromRoot.AppState>,
        private router: Router) {}
    canActivate(): Observable<boolean> {
            return this.authState.pipe(
                pluck('token'),
                switchMap(token => {
                    if (token) {
                        return of(true);
                    }
                    return of(false);
                })
            );
        }
}
