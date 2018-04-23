import { Component, Input, Output, OnInit, EventEmitter, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Files, File } from '../../interfaces/files.interface';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/reducers/app.reducer';
import * as fromUserFiles from '../../store/actions/userfiles.actions';
@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
    @Output() pageClick: EventEmitter<number> = new EventEmitter();
    @Input() filesSubject: Subject<[File[]]>;
    filesArray: [File[]];
    page = [];
    arrayPointer: number;

    constructor(private rend: Renderer2, private store: Store<fromRoot.AppState>) { }

    ngOnInit() {
        this.filesArray = [null];
        this.arrayPointer = 0;
        this.filesSubject
        .subscribe((data: [File[]]) => {
            this.arrayPointer = 0;
            this.page =  data.slice(0, 5);
            this.filesArray = data;
        });
    }

    pageLeft() {
        this.arrayPointer -= 5;
        this.page = this.filesArray.slice(this.arrayPointer, this.arrayPointer + 5);
        this.pageClick.emit(this.arrayPointer);

        // testing
        this.store.dispatch(new fromUserFiles.SetArrayPointer(-5));
    }

    pageRight() {
        this.arrayPointer += 5;
        this.page = this.filesArray.slice(this.arrayPointer, this.arrayPointer + 5);
        this.pageClick.emit(this.arrayPointer);

        // testing
        this.store.dispatch(new fromUserFiles.SetArrayPointer(5));

    }

    onClick(index: number, event) {
        this.pageClick.emit(index + this.arrayPointer);
        this.removeClass(event.target.parentElement.children);
        this.rend.addClass(event.target, 'active');
    }

    getArrayPointerRight() {
        if (this.filesArray.slice(this.arrayPointer + 5,
                this.arrayPointer + 10).length < 1) {
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
