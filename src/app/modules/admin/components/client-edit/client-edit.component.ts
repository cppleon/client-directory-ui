import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientAddComponent } from '../client-add/client-add.component';
import { Client } from 'src/app/shared/Client';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent extends ClientAddComponent implements OnInit {

  client: Client = new Client();

  constructor(
    protected _fb: FormBuilder,
    protected _http: HttpClient,
    protected _router: Router,
    protected _activatedRoute: ActivatedRoute
  ) {
    super(_fb, _http, _router);
  }

  ngOnInit() {
    const { client } = this._activatedRoute.snapshot.data;

    this.client = new Client(client.data);

    this.clientForm.patchValue(this.client);
  }

  updateClient() {
    this._http.put(`/api/clients/${this.client._id}`, this.clientForm.value).subscribe((res: any) => {
      this._router.navigate([`/admin/client-details/${this.client._id}`]);
    });
  }
}
