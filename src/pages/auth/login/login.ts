import { AuthenticationService } from '../../../services/authentication';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'page-auth-login',
  templateUrl: 'login.html'
})
export class AuthLoginPage {
  schemas = [{
    key: 'username',
    type: 'input',
    label: 'user.username',
    validators: [
      Validators.required
    ]
  }, {
    key: 'password',
    type: 'input',
    label: 'user.password',
    validators: [
      Validators.required
    ],
    opt: {
      type: 'password'
    }
  }, {
    key: 'code',
    type: 'input',
    label: 'package.schedule.code',
    validators: [
      Validators.required
    ]
  }];

  submit = (valid, values) => {
    if (valid) {
      this.auth.login(values);
    }
  }

  constructor(private auth: AuthenticationService) { }
}
