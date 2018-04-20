import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { saveAs } from 'file-saver/FileSaver';

@Injectable()
export class DownloadService {
    constructor(private httpClient: HttpClient) {}

    downloadFile(params: {url: string, filename: string}) {
        // const url = `http://192.168.1.231/api/files/download`;
        // const url = `http://192.168.0.102/api/files/download`;
        const url = 'http://192.168.254.102/api/files/download';
        // const url = `http://20.0.3.32/api/files/download`;
        return this.httpClient.post(url, {url: params.url},
            {responseType: 'blob', observe: 'response'})
        .pipe(retry(3))
        .subscribe(response => {
            saveAs(response.body, params.filename);
        });
    }

}
