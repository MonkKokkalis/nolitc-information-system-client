import { Component, OnInit } from '@angular/core';
import { FileService } from './services/file.service';

import { AuthenticationState, AuthInfo, User } from '../../interfaces/ngrx.interface';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';

import { Files, Response, UserFile } from '../../interfaces/files.interface';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../store/reducers/app.reducer';
import * as fromUserFiles from '../../store/actions/userfiles.actions';
import * as fromFileUpload from '../../store/actions/fileupload.actions';
// testing
import * as fromComponentState from '../../store/actions/componentstate.actions';
// testing
@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.css'],
  providers: [FileService]
})
export class FileManagementComponent implements OnInit {
    currentFilesArray$: Observable<UserFile[]>;
    authInfo$: Observable<AuthenticationState>;
    directories: string[];
    constructor(private fileService: FileService, private store: Store<fromRoot.AppState>,
        private router: Router) { }
    ngOnInit() {
        this.currentFilesArray$ = this.store.pipe(select(fromRoot.selectCurrentArray));
        this.authInfo$ = this.store.pipe(select(fromRoot.selectAuth));
    }

    selectFiles(event) {
        const files = Array.from(<File[]>event.target.files);
        this.store.dispatch(new fromFileUpload.SetFiles(files));
        this.store.dispatch(new fromFileUpload.ShowWindow);
    }

    searchFile(filename: string) {
        this.fileService.searchFile(filename)
        .subscribe((data: [UserFile[]]) => {
            this.store.dispatch(new fromUserFiles.SetUserFiles(data));
            this.store.dispatch(new fromComponentState.SetAlertText('test'));
        });
    }

    downloadFile(url: string) {
        const length = url.split('\\').length;
        const filename = url.split('\\')[length - 1];
        this.fileService.downloadFile({ url: url, filename: filename });
    }

    getDirectories() {
        // return this.fileService.getDirectories(this.user);
    }
}
