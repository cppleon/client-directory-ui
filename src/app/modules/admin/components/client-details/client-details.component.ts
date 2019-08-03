import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/shared/Client';
import { Account } from 'src/app/shared/Account';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  client: Client = new Client();
  accounts: Account[] = [];

  clientForm: FormGroup;
  accountForm: FormGroup;

  accountType = { 1: 'მიმდინარე', 2: 'შემნახველი', 3: 'დაგროვებითი' };

  // convenience getter for easy access to form fields
  get f() { return this.accountForm.controls; }

  constructor(
    private _fb: FormBuilder,
    private _http: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private _modalService: NgbModal
  ) {
    this.clientForm = this._fb.group({
      pid: '',
      firstName: '',
      lastName: '',
      gender: { value: '', disabled: true },
      phoneNumber: '',
      address: this._fb.group({
        legal: this._fb.group({
          country: '',
          city: '',
          address: ''
        }),
        physical: this._fb.group({
          country: '',
          city: '',
          address: ''
        })
      })
    });

    this.accountForm = this._fb.group({
      type: ['1', Validators.required],
      currency: ['GEL', Validators.required]
    });
  }

  ngOnInit() {
    const { client, accounts } = this._activatedRoute.snapshot.data;

    this.client = new Client(client.data);
    this.accounts = accounts.data.map((account: any) => new Account(account));

    this.clientForm.patchValue(this.client);
  }

  private _loadAccounts() {
    this._http.get(`/api/clients/${this.client._id}/accounts`).subscribe((res: any) => {
      this.accounts = res.data.map((account: any) => new Account(account));
    })
  }

  closeAccount(account: Account) {
    this._http.delete(`/api/clients/${this.client._id}/accounts/${account._id}`)
      .subscribe(() => this._loadAccounts());
  }

  addAccount(content) {
    this.accountForm.reset({ type: 1, currency: 'GEL' });

    this._modalService.open(content, {
      centered: true,
      ariaLabelledBy: 'modal-basic-title'
    }).result.catch(() => { }).then(() => {
      this._http.post(`/api/clients/${this.client._id}/accounts`, this.accountForm.value)
        .subscribe(() => this._loadAccounts());
    });
  }

}
