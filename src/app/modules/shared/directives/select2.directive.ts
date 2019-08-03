import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[data-toggle="select"]'
})
export class Select2Directive implements AfterViewInit {

  constructor(private _elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.init(this._elementRef.nativeElement);
  }

  init(el: any) {
    let elementOptions = el.dataset.options;
    elementOptions = elementOptions ? JSON.parse(elementOptions) : {};
    const defaultOptions = {
      dropdownParent: $(el).closest('.modal').length ? $(el).closest('.modal') : $(document.body),
      templateResult: this.formatTemplate
    };
    const options = Object.assign(elementOptions, defaultOptions);

    $(el).select2(options);

    $(el).on('select2:select', () => {
      this._elementRef.nativeElement.dispatchEvent(new Event('change'));
    });
  }

  formatTemplate(item) {
    if (!item.id) {
      return item.text;
    }

    const option = item.element;
    const avatar = option.dataset.avatarSrc;

    let content: any;
    if (avatar) {
      content = document.createElement('div');

      content.innerHTML = '<span class="avatar avatar-xs mr-3"><img class="avatar-img rounded-circle" src="' + avatar + '" alt="' + item.text + '"></span><span>' + item.text + '</span>';
    } else {
      content = item.text;
    }

    return content;
  }

}
