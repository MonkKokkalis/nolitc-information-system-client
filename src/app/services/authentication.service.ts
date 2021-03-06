import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { retry, catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class AuthenticationService {
    url = 'http://192.168.254.102/api/user/signin';
    // url = 'http://192.168.0.112/api/user/signin';
    constructor(private httpClient: HttpClient) { }
    signIn(params: {username: string, password: string}): Observable<Object> {
    return this.httpClient.post(this.url, {username: params.username,
        password: params.password},
            {responseType: 'json'});
    }
}
