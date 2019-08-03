import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminComponent } from './admin.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';

@NgModule({
  declarations: [
    AdminComponent,
    ClientListComponent,
    ClientDetailsComponent,
    ClientAddComponent,
    ClientEditComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    NgbModalModule,
    NgbPaginationModule
  ]
})
export class AdminModule { }
