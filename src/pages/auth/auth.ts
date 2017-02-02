import { AuthLoginPage } from './login/login';
import { AuthRegistrationPage } from './registration/registration';
import { Component } from '@angular/core';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {
  tab1Root: any = AuthLoginPage;
  // tab2Root: any = AuthLoginPage;
  tab2Root: any = AuthRegistrationPage;

  constructor() {

  }
}
