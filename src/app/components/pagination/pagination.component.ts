import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserFile } from '../../interfaces/files.interface';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../store/reducers/app.reducer';
import * as fromUserFiles from '../../store/actions/userfiles.actions';
@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})

export class PaginationComponent implements OnInit {
    arrayPointer$: Observable<number>;
    rightArrowVisible$: Observable<boolean>;
    page$: Observable<any>;

    constructor(private rend: Renderer2, private store: Store<fromRoot.AppState>) { }

    ngOnInit() {
        this.arrayPointer$ = this.store.pipe(select(fromRoot.selectArrayPointer));
        this.rightArrowVisible$ = this.store.pipe(select(fromRoot.selectRighttArrowVisible));
        this.page$ = this.store.pipe(select(fromRoot.selectFilesArraySlice));
    }

    pageLeft() {
        this.store.dispatch(new fromUserFiles.SetArrayPointer(-5));
    }

    pageRight() {
        this.store.dispatch(new fromUserFiles.SetArrayPointer(5));
    }

    onClick(index: number, event) {
        this.store.dispatch(new fromUserFiles.SetSelectedIndex(index));
        this.removeClass(event.target.parentElement.children);
        this.rend.addClass(event.target, 'active');
    }

    removeClass(elements) {
        const elementsArray = Array.from(elements);
        elementsArray.forEach(button => {
            this.rend.removeClass(button, 'active');
        });
    }

 }
