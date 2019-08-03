import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

  clientForm: FormGroup;

  // convenience getter for easy access to form fields
  get f() { return this.clientForm.controls; }

  get legal() {
    return (<FormGroup>(<FormGroup>this.clientForm.controls['address']).controls['legal']).controls;
  }

  get physical() {
    return (<FormGroup>(<FormGroup>this.clientForm.controls['address']).controls['physical']).controls;
  }

  constructor(
    protected _fb: FormBuilder,
    protected _http: HttpClient,
    protected _router: Router
  ) {
    this.clientForm = this._fb.group({
      pid: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^\d{11}$/)
      ])],
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^([a-zA-Z]+|[ა-ჰ]+)$/)]
      )],
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^([a-zA-Z]+|[ა-ჰ]+)$/)]
      )],
      gender: ['M', Validators.required],
      phoneNumber: ['5', Validators.compose([
        Validators.required,
        Validators.pattern(/^5[0-9]{8}$/)]
      )],
      pictureFileId: [''],
      address: this._fb.group({
        legal: this._fb.group({
          country: ['', Validators.required],
          city: ['', Validators.required],
          address: ['', Validators.required]
        }),
        physical: this._fb.group({
          country: ['', Validators.required],
          city: ['', Validators.required],
          address: ['', Validators.required]
        })
      })
    });
  }

  ngOnInit() {
  }

  dropzoneSuccess({ response }) {
    this.clientForm.controls['pictureFileId'].setValue(response.data._id);
    console.log(response, this.clientForm.value)
  }

  addClient() {
    this._http.post(`/api/clients`, this.clientForm.value).subscribe((res: any) => {
      this._router.navigate(['/admin/client-list']);
    });
  }

}
