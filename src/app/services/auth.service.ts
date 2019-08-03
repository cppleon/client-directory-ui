import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  set isLoggedIn(value: boolean) {
    sessionStorage.setItem('isLoggedIn', JSON.stringify(value));
  }

  get isLoggedIn() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return isLoggedIn && JSON.parse(isLoggedIn);
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }

}
