import { AuthenticationService } from '../../../services/authentication';
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'page-auth-registration',
  templateUrl: 'registration.html'
})
export class AuthRegistrationPage {
  schemas = [{
    key: 'name',
    type: 'input',
    label: 'user.name',
    validators: [
      Validators.required
    ]
  }, {
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
    key: 'passwordConfirm',
    type: 'input',
    label: 'user.passwordConfirm',
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
      this.auth.register(values);
    }
  }

  constructor(
    private auth: AuthenticationService
  ) { }

}
