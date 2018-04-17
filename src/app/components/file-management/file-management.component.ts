import { Component, OnInit } from '@angular/core';
import { DownloadService } from './services/download.service';
import { FileService } from './services/getfiles.service';
import { Files, File, Response } from '../../interfaces/files.interface';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { UploadService } from './services/upload.service';
import { SearchFileService } from './services/searchFile';
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
    constructor(private fileService: FileService,
        private downloadService: DownloadService, private uploadService: UploadService,
        private searchFileService: SearchFileService) { }
    ngOnInit() {
        this.filesSubject = new Subject();
        this.files$ = this.fileService.getFiles();
        this.files$
        .subscribe((data: [File[]]) => {
            this.filesArray = data;
            this.files = data[0];
            this.filesSubject.next(data);
         });
    }

    changePage(pageNumber: number) {
        this.files = this.filesArray[pageNumber];
    }

    upload(event) {
        const files = Array.from (event.target.files);
        this.uploadService.uploadFile(files)
        .subscribe((response: Response) => {
            const number = response.files <= 1 ? ' file was ' : ' files were ';
            this.alertText = response.files.toString().
                concat(`${number}successfully uploaded`);
            this.alertHidden = false;
            setTimeout(this.hideAlert, 1500);
        });
        this.fileService.getFiles()
            .subscribe((data: [File[]]) => {
                this.filesArray = data;
                this.files = data[0];
                this.filesSubject.next(data);
            });
    }

    hideAlert = () => {
        this.alertHidden = true;
    }

    searchFile(filename: string) {
        this.searchFileService.searchFile(filename)
        .subscribe((data: [File[]]) => {
            this.filesSubject.next(data);
            this.filesArray = data;
            this.files = data[0];
        });
    }

    downloadFile(url: string) {
        const length = url.split('\\').length;
        const filename = url.split('\\')[length - 1];
        this.downloadService.downloadFile({ url: url, filename: filename });
    }
}
// this.downloadService.downloadFile({url: this.url, filename: 'Airlines.docx'});
