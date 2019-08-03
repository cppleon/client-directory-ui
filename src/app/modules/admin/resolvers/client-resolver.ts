import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientResolver implements Resolve<any> {

  constructor(private _http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');

    return this._http.get(`/api/clients/${id}`);
  }

}
