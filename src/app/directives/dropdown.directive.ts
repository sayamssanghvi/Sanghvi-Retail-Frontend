import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') class = false;

  constructor() { }

  @HostListener('click') click() {
    this.class = !this.class;
  }

}
