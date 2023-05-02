import { Directive, ElementRef, HostBinding, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[appSelectColourSwitch]'
})
export class SelectColourSwitchDirective {

    hexDigits: any = new Array
        ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
    @Input('appSelectColourSwitch') appSelectColourSwitch = '';
    @Input('defaultColour') defaultColour = '';
    constructor(private element: ElementRef) {

    }

    @HostListener('click') click() {
        console.log("Directive");
        let previousColour = this.element.nativeElement.style.backgroundColor;
        if (previousColour != null && previousColour != "") {
            let color: any = this.rgb2hex(previousColour);
            if (color == this.defaultColour)
                this.element.nativeElement.style.backgroundColor = this.appSelectColourSwitch;
            else if (color == this.appSelectColourSwitch)
                this.element.nativeElement.style.backgroundColor = this.defaultColour;
        } else {
            this.element.nativeElement.style.backgroundColor = this.appSelectColourSwitch;
        }
    }


    //Function to convert rgb color to hex format   
    private rgb2hex(rgb: any) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
    }

    private hex(x: any) {
        return isNaN(x) ? "00" : this.hexDigits[(x - x % 16) / 16] + this.hexDigits[x % 16];
    }
}