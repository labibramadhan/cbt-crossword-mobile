import { AnswerApi, PackageScheduleApi, PersonApi } from '../lib/loopback-sdk/services';

import { AclService } from 'angular2-acl';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TestValidator } from './test-validator';
import _ from 'lodash';

@Injectable()
export class AuthenticationService {
  constructor(
    private aclService: AclService,
    private answer: AnswerApi,
    private packageSchedule: PackageScheduleApi,
    private person: PersonApi,
    private router: Router,
    private testValidator: TestValidator,
  ) { }

  redirector() {
    if (!this.aclService.hasRole('$authenticated')) {
      this.router.navigateByUrl('/');
    }
  }

  async authenticationCheck(currentUser?:any) {
    try {
      const whoAmI = currentUser ? currentUser : <{ roles: String[] }>await this.person.whoAmI().toPromise();
      this.aclService.flushRoles();
      for (const role of whoAmI.roles) {
        this.aclService.attachRole(role);
      }
      this.redirector();
    } catch (e) {
      await this.logout();
      return false;
    }
  };

  async login(model: {
    email: string | undefined,
    username: string | undefined,
    password: string,
    code: string
  }) {
    if (
      (
        _.get(model, 'email') ||
        _.get(model, 'username')
      ) &&
      _.get(model, 'password') &&
      _.get(model, 'code')
    ) {
      const login = <{ userId: string }>await this.person.login(model).toPromise();
      try {
        await this.testValidator.validateCode(model.code, login.userId);
      } catch(errorCode) {
        await this.logout();
        return;
      }
      await this.authenticationCheck(login);
      this.router.navigateByUrl(`/test/fill/${model.code}`);
    }
  };

  async register(model: {
    name: string,
    email: string | undefined,
    username: string,
    password: string,
    code: string
  }) {
    model.email = model.username + "@mailinator.com";

    await this.person.registerParticipant(model).toPromise();
    console.log('Pendaftaran berhasil');

    await this.login(model);
    console.log('Selamat mengerjakan TTS!');
  };

  async logout() {
    await this.person.logout().toPromise();
    this.aclService.flushRoles();
    this.aclService.attachRole('guest');
    this.router.navigateByUrl('/');
  };
}
