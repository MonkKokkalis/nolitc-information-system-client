import { Component, OnInit } from '@angular/core';
import { DownloadService } from './services/download.service';
import { FileService } from './services/getfiles.service';
import { Files, File } from '../../interfaces/files.interface';
import { Observable } from 'rxjs/Observable';
import { UploadService } from './services/upload.service';

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.css'],
  providers: [FileService, DownloadService, UploadService]
})
export class FileManagementComponent implements OnInit {
    files$: Observable<Object>;
    filesArray: [File[]];
    files: File[];
    url: string;
    constructor(private fileService: FileService,
        private downloadService: DownloadService, private uploadService: UploadService) { }
    ngOnInit() {
        this.files$ = this.fileService.getFiles();
        this.files$
        .subscribe((data: Files) => {
            this.filesArray = data.files;
            this.files = data.files[0];
            this.url = data.url;
         });
    }

    changePage(pageNumber: number) {
        this.files = this.filesArray[pageNumber];
    }

    upload(event) {
        const file = event.target.files[0];
        this.uploadService.uploadFile(file)
        .subscribe(response => {
            console.log(response);
        });
    }
}
// this.downloadService.downloadFile({url: this.url, filename: 'Airlines.docx'});
