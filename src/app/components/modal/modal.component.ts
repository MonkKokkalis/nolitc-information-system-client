import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
    @ViewChild('modal') modal: ElementRef;
    visibility: boolean;
    constructor(private modalService: ModalService) {}

    ngOnInit() {
        this.modalService.modalSubject.subscribe(data => {
            this.visibility = data;
        });
    }
}
