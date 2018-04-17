import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Store } from '@ngrx/store';
import { AuthenticationState } from '../../interfaces/ngrx.interface';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  modalSubject: BehaviorSubject<any>;
  authState: Observable<AuthenticationState>;
  constructor(private modalService: ModalService,
    private store: Store<{authenticationState: AuthenticationState}> ) { }

  ngOnInit() {
      this.authState = this.store.select('authenticationState');
      this.modalSubject = this.modalService.modalSubject;
  }

  showModal() {
      this.modalSubject.next(true);
  }
}
