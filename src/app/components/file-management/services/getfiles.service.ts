import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { retry } from 'rxjs/operators';
import { User } from '../../../interfaces/ngrx.interface';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { UserFile } from '../../../interfaces/files.interface';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class FileService {
    constructor(private httpClient: HttpClient) {}
    // url = `http://192.168.1.231/api/files/get/`;
    url = 'http://192.168.254.102/api/files/get/';
    // url = 'http://192.168.0.103/api/files/get/';
    // url = 'http://20.0.3.32/api/files/get/';

    getFiles(user: User): Observable<Object> {
        return this.httpClient.post(this.url.concat(user.type), { user: user },
            { responseType: 'json' }, );
    }

    // getFiles(user: User): Promise<Object> {
    //     return new Promise(resolve => {
    //        this.httpClient.post(this.url.concat(user.type), { user: user },
    //            { responseType: 'json' })
    //         .subscribe((data: [UserFile[]]) => {
    //             resolve(data);
    //         });
    //    });
    // }

    getDirectories(user: User): Observable<Object> {
        return this.httpClient.post(this.url.concat(user.type),
            { user: user, target: 'directories' },
            { responseType: 'json' });
    }
}
