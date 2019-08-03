import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientAddComponent } from './components/client-add/client-add.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';

import { ClientResolver } from './resolvers/client-resolver';
import { AccountsResolver } from './resolvers/accounts-resolver';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'client-list', component: ClientListComponent },
      {
        path: 'client-details/:id',
        component: ClientDetailsComponent,
        resolve: {
          client: ClientResolver,
          accounts: AccountsResolver
        }
      },
      { path: 'client-add', component: ClientAddComponent },
      {
        path: 'client-edit/:id',
        component: ClientEditComponent,
        resolve: { client: ClientResolver }
      },
      {
        path: '',
        redirectTo: 'client-list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
