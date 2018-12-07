import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import Chameleon from '../../chameleon/Chameleon.js';

@Directive({
  selector: '[appChameleonMask]'
})
export class ChameleonDirective implements OnInit{

  @Input() mask : string;
  @Input() masks : string[] | null | undefined;
  @Input() maskConfig : Object | null | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.maskConfig) {
      Chameleon.initOptions(this.el.nativeElement, this.maskConfig);
    } else if (this.masks) {
      Chameleon.init(this.el.nativeElement, ...this.masks);
    } else if (this.mask) {
      Chameleon.init(this.el.nativeElement, this.mask);
    }
  }
}
