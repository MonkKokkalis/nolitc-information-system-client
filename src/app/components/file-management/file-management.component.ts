import { Component, OnInit } from '@angular/core';
import { FileService } from './services/file.service';

import { AuthenticationState, AuthInfo, User } from '../../interfaces/ngrx.interface';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';

import { Files, File, Response, UserFile } from '../../interfaces/files.interface';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../store/reducers/app.reducer';
import * as fromUserFiles from '../../store/actions/userfiles.actions';
@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.css'],
  providers: [FileService]
})
export class FileManagementComponent implements OnInit {
    alertHidden = true;
    alertText = '';
    currentFilesArray$: Observable<UserFile[]>;
    authInfo$: Observable<AuthenticationState>;
    directories: string[];
    constructor(private fileService: FileService, private store: Store<fromRoot.AppState>,
        private router: Router) { }
    ngOnInit() {
        this.currentFilesArray$ = this.store.pipe(select(fromRoot.selectCurrentArray));
        this.authInfo$ = this.store.pipe(select(fromRoot.selectAuth));
    }

    upload(event) {
        const files = Array.from (event.target.files);
        this.fileService.uploadFile(files)
        .subscribe((response: Response) => {
            // const number = response.files <= 1 ? ' file was ' : ' files were ';
            // this.alertText = response.files.toString().
            //     concat(`${number}successfully uploaded`);
            // this.alertHidden = false;
            // setTimeout(this.hideAlert, 1500);
            // this.fileService.getFiles()
            //     .subscribe((data: [File[]]) => {
            //         this.filesArray = data;
            //         this.files = data[0];
            //         this.filesSubject.next(data);
            //     });
        });
    }

    hideAlert = () => {
        this.alertHidden = true;
    }

    searchFile(filename: string) {
        this.fileService.searchFile(filename)
        .subscribe((data: [File[]]) => {
            this.store.dispatch(new fromUserFiles.SetUserFiles(data));
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
