import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  signInForm: FormGroup;

  private readonly _bodyClassNames = ['d-flex', 'align-items-center', 'bg-auth', 'border-top', 'border-top-2', 'border-primary'];

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
    this.signInForm = this._fb.group({
      email: ['user@example.com'],
      password: ['P@ssw0rd']
    });
  }

  ngOnInit() {
    document.body.classList.add(...this._bodyClassNames);
  }

  ngOnDestroy() {
    document.body.classList.remove(...this._bodyClassNames);
  }

  signIn() {
    this._authService.login().subscribe(() => {
      this._router.navigate(['/admin']);
    });
  }

}
