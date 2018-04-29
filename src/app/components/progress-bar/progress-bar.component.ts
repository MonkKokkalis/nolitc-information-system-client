import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../store/reducers/app.reducer';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';
import { FileService } from '../file-management/services/file.service';

import { distinctUntilChanged, filter } from 'rxjs/operators';
@Component({
    selector: 'app-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
    @Input() fileForUpload: File;
    fileUploadState$: Observable<string>;
    @ViewChild('progressBar') progressBarRef: ElementRef;
    @ViewChild('barText') barTextRef: ElementRef;
    progressBar: HTMLElement;
    barText: HTMLElement;
    ngOnInit() {
        this.progressBar = this.progressBarRef.nativeElement;
        this.barText = this.barTextRef.nativeElement;
        this.fileUploadState$ = this.store.pipe(select(fromRoot.selectFileUploadState));
        this.fileUploadState$.pipe(
            filter(event => event === 'Uploading'),
            switchMap(() => this.fileService.uploadFile(this.fileForUpload))
        )
        .subscribe((data: string) => {
            this.rend.setStyle(this.progressBar, 'width', data);
            if (data === '100%') {
                this.rend.setProperty(this.barText, 'innerHTML', 'Completed');
                this.rend.setStyle(this.barText, 'color', 'rgb(157, 216, 70)');
                this.rend.setStyle(this.barText, 'padding-left', '40%');
            } else {
                if ( data === '15%') {
                    this.rend.setStyle(this.barText, 'color', 'whitesmoke');
                }
                this.rend.setProperty(this.barText, 'innerHTML', data);
            }
        });
    }

    ngOnDestroy() {

    }
    constructor(private store: Store<fromRoot.AppState>,
        private fileService: FileService, private rend: Renderer2) { }
}
