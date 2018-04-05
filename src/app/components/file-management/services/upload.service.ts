import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UploadService {
    constructor(private httpClient: HttpClient) {}

    // httpRequest = new HttpRequest();

    uploadFile(file: File) {
         const url = 'http://192.168.254.100/api/files/upload/registrar';
        // const url = 'http://192.168.0.113/api/files/upload/registrar';
         const formData = new FormData();
         formData.append('file', file);
         return this.httpClient.post<File>(url, formData);
    }
}
