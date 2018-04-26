import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators/retry';
import { saveAs } from 'file-saver/FileSaver';
import { User } from '../../../interfaces/ngrx.interface';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class FileService {
    private ip = '192.168.254.102';

    downloadFile(params: { url: string, filename: string }) {
        const url = `http://${this.ip}/api/files/download`;
        return this.httpClient.post(url, { url: params.url },
            { responseType: 'blob', observe: 'response' })
            .pipe(retry(3))
            .subscribe(response => {
                saveAs(response.body, params.filename);
        });
    }

    getFiles(user: User): Observable<Object> {
        const url = `http://${this.ip}/api/files/get/`;
        return this.httpClient.post(url.concat(user.type), { user: user },
            { responseType: 'json' }, );
    }

    getDirectories(user: User): Observable<Object> {
        const url = `http://${this.ip}/api/files/get/`;
        return this.httpClient.post(url.concat(user.type),
            { user: user, target: 'directories' },
            { responseType: 'json' });
    }

    searchFile(filename: string): Observable<Object> {
        const url = `http://${this.ip}/api/files/searchFile/registrar`;
        return this.httpClient.post(url, { filename: filename },
            { responseType: 'json' });
    }

    uploadFile(files) {
        const url = `http://${this.ip}/api/files/upload/registrar`;
        const formData = new FormData();
        files.forEach(element => {
            formData.append('files', element);
        });
        return this.httpClient.post(url, formData);
    }

    constructor(private httpClient: HttpClient) {}
}
