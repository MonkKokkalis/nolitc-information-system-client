import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalService } from '../../services/modal.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticationState, AuthInfo } from '../../interfaces/ngrx.interface';
import * as stateActions from '../../store/actions/authentication.actions';
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
    // testing purposes
    authState: Observable<AuthenticationState>;
    //
    constructor(private modalService: ModalService,
        private authenticationService: AuthenticationService,
        private store: Store<{authenticationState: AuthenticationState}>) {}

    ngOnInit() {
        this.signInForm = new FormGroup({
            'username': new FormControl(),
            'password': new FormControl()
        });
        this.modalService.modalSubject.subscribe(data => this.visibility = data);
        this.usernameFormControl = <FormControl> this.signInForm.controls.username;
        this.passwordFormControl = <FormControl> this.signInForm.controls.password;

        // testing
        this.authState = this.store.select('authenticationState');
        this.authState.subscribe(data => console.log(data));
        //
    }

    closeModal() {
        this.modalService.modalSubject.next(false);
    }

    submit() {
        const username = this.usernameFormControl.value;
        const password = this.passwordFormControl.value;
        this.authenticationService.signIn({username: username, password: password})
            .subscribe((data: AuthInfo) => {
                this.store.dispatch(new stateActions.SignIn(data));
            },
            (error) => {
                console.log(error);
            });
    }
}
