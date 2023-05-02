import { Directive, ElementRef, Input, OnChanges, Renderer2, ViewChild } from '@angular/core';

@Directive({
  selector: '[appStatus]'
})
export class StatusDirective implements OnChanges {

  @Input('status') status: string = '';
  constructor(private renderer: Renderer2, private spanElement: ElementRef) {

  }

  ngOnChanges(): void {
    this.renderer.setStyle(this.spanElement.nativeElement, 'background-color', this.getBackGroundColor(this.status));
    this.renderer.setStyle(this.spanElement.nativeElement, 'color', '#ffffff');
  }

  getBackGroundColor(status: string): string {
    switch (status) {
      case 'RECEIVED':
        return '#ff4081';
        break;
      case 'AWAITING RESPONSE':
        return '#616161';
        break;
      case 'IN REPAIR':
        return '#ffa000'
        break;
      case 'IN FACTORY':
        return '#0288d1';
        break;
      case 'REPAIRED':
        return '#48a999'
        break;
      case 'DELIVERED':
        return '#004c40';
        break;
      case 'CANCELED':
        return '#d32f2f';
        break;
      default:
        return '#c51162';
        break;
    }
  }

}
