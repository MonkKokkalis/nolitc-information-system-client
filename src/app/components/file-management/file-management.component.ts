import { Component, OnInit } from '@angular/core';

import { DownloadService } from './services/download.service';
import { UploadService } from './services/upload.service';
import { SearchFileService } from './services/searchFile';
import { FileService } from './services/getfiles.service';

import { AuthenticationState, AuthInfo, User } from '../../interfaces/ngrx.interface';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';

import { Files, File, Response } from '../../interfaces/files.interface';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../store/reducers/app.reducer';
import * as fromUserFiles from '../../store/actions/userfiles.actions';
@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.css'],
  providers: [FileService, DownloadService, UploadService, SearchFileService]
})
export class FileManagementComponent implements OnInit {
    alertHidden = true;
    alertText = '';
    files$: Observable<Object>;
    filesSubject: Subject<[File[]]>;
    filesArray: [File[]];
    files: File[];
    authInfo$: Observable<AuthenticationState>;
    user: User;
    directories: string[];
    constructor(private fileService: FileService,
        private downloadService: DownloadService, private uploadService: UploadService,
        private searchFileService: SearchFileService,
        private store: Store<fromRoot.AppState>,
        private router: Router) { }
    ngOnInit() {
        this.filesSubject = new Subject();
        this.authInfo$ = this.store.pipe(select(fromRoot.selectAuth));
        this.authInfo$
        .pipe(
            map((authInfo: AuthInfo) => {
                this.user = authInfo.user;
                return authInfo.user;
            }),
            switchMap((user: User) => this.fileService.getFiles(user)
            ),
            catchError(() => new ErrorObservable(null))
        ).subscribe((data: [File[]]) => {
            this.filesSubject.next(data);
            this.filesArray = data;
            this.files = data[0];
        }, () => {
                this.router.navigate(['/']);
            }
        );
        const filesArray$ = this.store.pipe(select(fromRoot.selectFilesArraySlice));
        // testing the selector
        filesArray$.subscribe(data => console.log(data));
    }

    changePage(pageNumber: number) {
        this.files = this.filesArray[pageNumber];
    }

    upload(event) {
        const files = Array.from (event.target.files);
        this.uploadService.uploadFile(files)
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
        this.searchFileService.searchFile(filename)
        .subscribe((data: [File[]]) => {
            this.store.dispatch(new fromUserFiles.SetUserFiles(data));
            this.filesArray = data;
            this.files = data[0];
            this.filesSubject.next(data);
        });
    }

    downloadFile(url: string) {
        const length = url.split('\\').length;
        const filename = url.split('\\')[length - 1];
        this.downloadService.downloadFile({ url: url, filename: filename });
    }

    getDirectories() {
        // return this.fileService.getDirectories(this.user);
    }
}
