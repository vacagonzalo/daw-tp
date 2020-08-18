import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {

  constructor(private elemento:ElementRef) { }
  @Input()colorBase: string;
  @Input('appResaltar') resaltarColor: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.resaltar(this.resaltarColor || this.colorBase || 'red');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.resaltar(null);
  }

  private resaltar(color:string):void {
    this.elemento.nativeElement.style.backgrondColor = color;
  }
}
