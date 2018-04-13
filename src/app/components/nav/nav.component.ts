import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  modalSubject: BehaviorSubject<any>;
  constructor(private modalService: ModalService) { }

  ngOnInit() {
      this.modalSubject = this.modalService.modalSubject;
  }

  showModal() {
      this.modalSubject.next(true);
  }
}
