import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appIcon]'
})

export class IconDirective implements OnInit {
    @Input()appIcon: string;
    parentElement: HTMLElement;
    constructor(private el: ElementRef, private rend: Renderer2) {}

    ngOnInit() {
        this.parentElement = this.el.nativeElement;
        const firstChild = <HTMLElement> this.parentElement.firstElementChild;
        const image = <HTMLImageElement> this.rend.createElement('img');
        this.rend.setAttribute(image, 'src', this.setIcon());
        this.rend.setStyle(image, 'margin', '5px 5px 0 0');
        this.rend.setStyle(image, 'float', 'left');
        this.rend.insertBefore(this.parentElement, image, firstChild);
    }

    setIcon() {
        const filetype = this.appIcon.split('/')[1];
        let type;
        if (filetype) {
            type = filetype;
        } else {
            type = this.appIcon;
        }
        switch (type) {
            case 'installer':
                return '../../assets/exe.png';
            case 'jpeg':
                return '../../assets/jpg.png';
            case 'microsoft excel file':
                return '../../assets/xlsx.png';
            case 'microsoft word file':
                return '../../assets/doc.png';
            case 'mp3':
                return '../../assets/mp3.png';
            case 'mp4':
                return '../../assets/mp4.png';
            case 'pdf':
                return '../../assets/pdf.png';
            case 'png':
                return '../../assets/png.png';
            case 'plain':
                return '../../assets/txt.png';
            case 'psd':
                return '../../assets/psd.png';
            case 'zip':
                return '../../assets/rar.png';
            default: return '../../assets/blank.png';
        }
    }
}
