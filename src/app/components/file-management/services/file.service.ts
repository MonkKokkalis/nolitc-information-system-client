import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { retry } from 'rxjs/operators/retry';
import { saveAs } from 'file-saver/FileSaver';
import { User } from '../../../interfaces/ngrx.interface';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';
import { last } from 'rxjs/operators/last';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Injectable()
export class FileService {
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

    uploadFile(files) {
        const url = `http://${this.ip}/api/files/upload/registrar`;
        // const formData = new FormData();
        // files.forEach(element => {
        //     formData.append('files', element);
        // });
        // return this.httpClient.post(url, formData);

        const formData = new FormData();
        files.forEach(element => {
            formData.append('files', element);
        });
        console.log(formData);
        const uploadRequest = new HttpRequest('POST', url, formData,
            {reportProgress: true});
        return this.httpClient.request(uploadRequest)
            .pipe(
                map(event => this.getEventMessage(event, files)),
                tap(message => this.logMessage(message)),
                last(), // return last (completed) message to caller
                catchError((error) => of(error))
            );
    }

    private getEventMessage(event: HttpEvent<any>, file) {
        switch (event.type) {
            case HttpEventType.Sent:
                return `Uploading file ${file.name} of size ${file.size}`;
            case HttpEventType.UploadProgress:
                const percentDone = Math.round(100 * event.loaded / event.total);
                return `File ${file.filename} is ${percentDone} uploaded`;
            case HttpEventType.Response:
                return `File ${file.name} was completely uploaded`;
            default:
                return `File ${file.name} surprising upload event: ${event.type}`;
        }
    }

    logMessage(message: string) {
        console.log(message);
    }

    constructor(private httpClient: HttpClient) {}
}
