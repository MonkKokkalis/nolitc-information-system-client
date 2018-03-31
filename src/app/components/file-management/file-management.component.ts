import { Component, OnInit } from '@angular/core';
import { DownloadService } from './download.service';
import { FileService } from './getfiles.service';
import { Files, File } from '../../interfaces/files.interface';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.css'],
  providers: [FileService, DownloadService]
})
export class FileManagementComponent implements OnInit {
    files$: Observable<Object>;
    filesArray: [File[]];
    files: File[];
    url: string;
    constructor(private fileService: FileService,
        private downloadService: DownloadService) { }
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
}
// this.downloadService.downloadFile({url: this.url, filename: 'Airlines.docx'});
