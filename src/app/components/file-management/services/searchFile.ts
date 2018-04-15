import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchFileService {
    constructor(private httpClient: HttpClient) {}
    // url = 'http://192.168.254.102/api/files/searchFile/registrar';
    // url = 'http://192.168.0.103/api/files/searchFile/registrar';
    url = 'http://10.0.0.39/api/files/searchFile/registrar';
    searchFile(filename: string): Observable<Object> {
        return this.httpClient.post(this.url, {filename: filename},
            {responseType: 'json'});
    }
}
