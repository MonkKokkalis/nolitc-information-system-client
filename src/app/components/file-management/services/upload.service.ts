import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UploadService {
    constructor(private httpClient: HttpClient) {}
    uploadFile(files) {
        // const url = 'http://192.168.254.102/api/files/upload/registrar';
        // const url = 'http://192.168.254.102/api/files/upload/registrar';
        const url = 'http://192.168.0.105/api/files/upload/registrar';
        const formData = new FormData();
        files.forEach(element => {
             formData.append('files', element);
        });
        return this.httpClient.post(url, formData);
    }
}
