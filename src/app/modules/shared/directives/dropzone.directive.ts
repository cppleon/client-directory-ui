import { Directive, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';
import * as Dropzone from 'dropzone';

const Dz = Dropzone;

@Directive({
  selector: '[data-toggle="dropzone"]'
})
export class DropzoneDirective implements AfterViewInit {

  @Output() success: EventEmitter<any> = new EventEmitter();

  constructor(private _elementRef: ElementRef) {
    this._globalOptions();
  }

  ngAfterViewInit() {
    this._init(this._elementRef.nativeElement);
  }

  private _globalOptions() {
    Dz.autoDiscover = false;
    // Dropzone.thumbnailWidth = null;
    // Dropzone.thumbnailHeight = null;
  }

  private _init(el: any) {
    let currentFile = undefined;
    let elementOptions = el.dataset.options;
    elementOptions = elementOptions ? JSON.parse(elementOptions) : {};
    const self = this;
    const defaultOptions = {
      previewsContainer: el.querySelector('.dz-preview'),
      previewTemplate: el.querySelector('.dz-preview').innerHTML,
      init: function () {
        this.on('success', function (file, response) {
          self.success.emit({ file, response });
        })
        this.on('addedfile', function (file) {
          var maxFiles = elementOptions.maxFiles;
          if (maxFiles == 1 && currentFile) {
            this.removeFile(currentFile);
          }
          currentFile = file;
        });
      }
    }
    const options = Object.assign(elementOptions, defaultOptions);

    // Clear preview
    el.querySelector('.dz-preview').innerHTML = '';

    // Init dropzone
    new Dz(el, options);
  }

}
