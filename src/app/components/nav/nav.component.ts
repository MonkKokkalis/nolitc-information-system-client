import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store, select } from '@ngrx/store';
import { AuthenticationState } from '../../interfaces/ngrx.interface';
import { Observable } from 'rxjs/Observable';
import * as stateActions from '../../store/actions/authentication.actions';
import * as fromRoot from '../../store/reducers/app.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  modalSubject: BehaviorSubject<any>;
  authState: Observable<AuthenticationState>;
  constructor(private modalService: ModalService,
    private store: Store<fromRoot.AppState>,
    private router: Router) { }

  ngOnInit() {
      this.authState = this.store.pipe(select(fromRoot.selectAuth));
      this.modalSubject = this.modalService.modalSubject;
  }

  showModal() {
      this.modalSubject.next(true);
  }

  signOut() {
      this.store.dispatch(new stateActions.SignOut());
      this.router.navigate(['/']);
  }
}
