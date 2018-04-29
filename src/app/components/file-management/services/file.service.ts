import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType, HttpProgressEvent } from '@angular/common/http';
import { retry } from 'rxjs/operators/retry';
import { saveAs } from 'file-saver/FileSaver';
import { User } from '../../../interfaces/ngrx.interface';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { of } from 'rxjs/observable/of';
// testing
import { catchError, filter } from 'rxjs/operators';
import { last } from 'rxjs/operators/last';

@Injectable()
export class FileService {
    // testing

    private ip = '192.168.254.102';
    // private ip = '192.168.0.112';
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

    uploadFile(file: File) {
        const url = `http://${this.ip}/api/files/upload/registrar`;
        const formData = new FormData();
        formData.append('file', file);
        const uploadRequest = new HttpRequest('POST', url, formData, {reportProgress: true});
        return this.httpClient.request(uploadRequest)
            .pipe(
                filter((event: HttpEvent<any>) => event.type === 1),
                map((event: HttpProgressEvent) => this.getEventMessage(event, file))
            );
    }

    private getEventMessage(event: HttpProgressEvent, file: File) {
            const percentDone = Math.round(100 * event.loaded / event.total);
            return `${percentDone}%`;
    }

    // logMessage(message: string) {
    //     console.log(message);
    // }
    constructor(private httpClient: HttpClient) {}
}
