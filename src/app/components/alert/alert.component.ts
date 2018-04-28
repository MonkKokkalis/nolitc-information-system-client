import { Component, Input, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../store/reducers/app.reducer';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
    visible$: Observable<boolean>;
    alertText$: Observable<string>;
    ngOnInit() {
        this.visible$ = this.store.pipe(select(fromRoot.selectComponentVisibility));
        this.alertText$ = this.store.pipe(select(fromRoot.selectAlertText));
    }

    constructor(private store: Store<fromRoot.AppState>) {}
}
