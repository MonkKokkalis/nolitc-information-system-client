import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Files, File } from '../../interfaces/files.interface';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
    @Input() page$: Observable<Object>;
    @Output() pageClick: EventEmitter<number> = new EventEmitter();
    filesArray: [File[]];
    page;
    arrayPointer: number;
    ngOnInit() {
        this.arrayPointer = 0;
        this.page$
        .subscribe((data: Files) => {
           this.filesArray = data.files;
           this.page =  data.files.slice(0, 5);
        });
    }

    pageLeft() {
        this.arrayPointer -= 5;
        this.page = this.filesArray.slice(this.arrayPointer, this.arrayPointer + 5);
    }

    pageRight() {
        this.arrayPointer += 5;
        this.page = this.filesArray.slice(this.arrayPointer, this.arrayPointer + 5);
    }

    onClick(index: number) {
        this.pageClick.emit(index + this.arrayPointer);
    }

 }
