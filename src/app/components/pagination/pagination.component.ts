import { Component, Input, Output, OnInit, EventEmitter, Renderer2 } from '@angular/core';
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
    page = [];
    arrayPointer: number;

    constructor(private rend: Renderer2) { }

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
        this.pageClick.emit(this.arrayPointer);
    }

    pageRight() {
        this.arrayPointer += 5;
        this.page = this.filesArray.slice(this.arrayPointer, this.arrayPointer + 5);
        this.pageClick.emit(this.arrayPointer);
    }

    onClick(index: number, event) {
        this.pageClick.emit(index + this.arrayPointer);
        this.removeClass(event.target.parentElement.children);
        this.rend.addClass(event.target, 'active');
    }

    getArrayPointerLeft() {
        if (this.page.slice(this.arrayPointer,
            this.arrayPointer + 5).length < 5) {
            return true;
        }
        return false;
    }

    getArrayPointerRight() {
        if (this.page.length < 5) {
            return true;
        }
        return false;
    }

    getArrayPointer() {
        return this.arrayPointer;
    }

    removeClass(elements) {
        const elementsArray = Array.from(elements);
        elementsArray.forEach(button => {
            this.rend.removeClass(button, 'active');
        });
    }

 }
