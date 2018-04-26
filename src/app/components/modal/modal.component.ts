import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ModalService } from '../../services/modal.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthInfo, AuthenticationState } from '../../interfaces/ngrx.interface';
import * as authActions from '../../store/actions/authentication.actions';
import * as fromRoot from '../../store/reducers/app.reducer';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
    @ViewChild('modal') modal: ElementRef;
    signInForm: FormGroup;
    usernameFormControl: FormControl;
    passwordFormControl: FormControl;
    visibility: boolean;
    authState$: Observable<AuthenticationState>;
    constructor(private modalService: ModalService,
        private authenticationService: AuthenticationService,
        private store: Store<fromRoot.AppState>) {}

    ngOnInit() {
        this.authState$ = this.store.pipe(select(fromRoot.selectAuth));
        this.signInForm = new FormGroup({
            'username': new FormControl(),
            'password': new FormControl()
        });
        this.modalService.modalSubject.subscribe(data => this.visibility = data);
        this.usernameFormControl = <FormControl> this.signInForm.controls.username;
        this.passwordFormControl = <FormControl> this.signInForm.controls.password;
    }

    closeModal() {
        this.modalService.modalSubject.next(false);
    }

    submit() {
        const username = this.usernameFormControl.value;
        const password = this.passwordFormControl.value;
        this.store.dispatch(new authActions.SignIn({username: username, password: password}));
        this.modalService.modalSubject.next(false);
    }
}
