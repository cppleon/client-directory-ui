import { Directive, Input, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[data-mask]'
})
export class JqueryMaskPluginDirective implements AfterViewInit {

  @Input('data-mask') mask: string;

  constructor(private _elementRef: ElementRef) { }

  ngAfterViewInit() {
    $(this._elementRef.nativeElement).mask(this.mask);
  }

}
