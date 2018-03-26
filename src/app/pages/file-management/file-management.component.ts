import { Component, OnInit } from '@angular/core';
import { DownloadService } from './download.service';
import { FileService } from './getfiles.service';
import { Files, File } from '../../interfaces/files.interface';

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.css'],
  providers: [FileService, DownloadService]
})
export class FileManagementComponent implements OnInit {
    files: Array<File>;
    url: string;
    constructor(private fileService: FileService, private downloadService: DownloadService) { }
    ngOnInit() {
        this.fileService.getFiles()
        .subscribe((data: Files) => {
            this.files = data.files;
            this.url = data.url;
            console.log(this.url);
            this.downloadService.downloadFile({url: this.url, filename: 'Airlines.docx'});
        });
            // .subscribe((data) => {
            //     console.log(data);
            // });
    }


}
