import { Component, HostListener } from '@angular/core';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    @HostListener('document:click', ['$event']) onClick(event) {
        const element: HTMLElement = event.target;
            if (!element.parentElement) {
                return this.modalService.modalSubject.next(false);
            }
            if (element.tagName !== 'BUTTON' && !element.parentElement.classList[0]) {
                this.modalService.modalSubject.next(false);
            }
    }

    constructor(private modalService: ModalService) {}
}
