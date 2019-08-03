import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DropzoneDirective } from './directives/dropzone.directive';
import { Select2Directive } from './directives/select2.directive';
import { JqueryMaskPluginDirective } from './directives/jquery-mask-plugin.directive';

@NgModule({
  declarations: [
    DropzoneDirective,
    Select2Directive,
    JqueryMaskPluginDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DropzoneDirective,
    Select2Directive,
    JqueryMaskPluginDirective
  ]
})
export class SharedModule { }
