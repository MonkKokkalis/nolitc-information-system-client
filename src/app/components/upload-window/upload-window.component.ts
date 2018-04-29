import { Component, OnInit} from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../store/reducers/app.reducer';
import * as fromFileUploadAction from '../../store/actions/fileupload.actions';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'app-upload-window',
    templateUrl: './upload-window.component.html',
    styleUrls: ['./upload-window.component.css']
})
export class UploadWindowComponent implements OnInit {
    windowVisibility$: Observable<boolean>;
    filesForUpload$: Observable<File[]>;
    ngOnInit() {
        this.windowVisibility$ = this.store.
            pipe(select(fromRoot.selectUploadWindowVisibility));
        this.filesForUpload$ = this.store.
            pipe(select(fromRoot.selectFilesForUpload));
    }

    closeUploadWindow() {
        this.store.dispatch(new fromFileUploadAction.HideWindow);
        this.store.dispatch(new fromFileUploadAction.SetFileUploadState('Stand By'));
    }

    submit() {
        this.store.dispatch(new fromFileUploadAction.SetFileUploadState('Uploading'));
    }

    constructor(private store: Store<fromRoot.AppState>) {}
}
