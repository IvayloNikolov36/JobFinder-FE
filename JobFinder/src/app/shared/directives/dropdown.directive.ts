import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[jfDropdown]',
  standalone: false
})
export class DropdownDirective {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('click') handleClick() {

    const classValue: any = this.element.nativeElement.className;
    const divElement: any = this.element.nativeElement.querySelector('div');

    const className: string = 'show';
    const nativeElement: any = this.element.nativeElement;

    if (classValue.endsWith('show')) {
      this.renderer.removeClass(nativeElement, className);
      this.renderer.removeClass(divElement, className);
    } else {
      this.renderer.addClass(nativeElement, className);
      this.renderer.addClass(divElement, className);
    }
  }
}
