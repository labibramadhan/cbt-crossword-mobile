import { AnswerApi, PackageScheduleApi, PersonApi } from '../lib/loopback-sdk/services';

import { AclService } from 'angular2-acl';
import { Injectable } from '@angular/core';
import { RejectionHandler } from './rejection-handler';
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
    private rejectionHandler: RejectionHandler
  ) { }

  redirector() {
    if (!this.aclService.hasRole('$authenticated')) {
      this.router.navigateByUrl('/');
    }
  }

  async authenticationCheck() {
    try {
      const whoAmI = <{ roles: String[] }>await this.person.whoAmI().toPromise();
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
      let login;
      try {
        login = <{ userId: string }>await this.person.login(model).toPromise();
      } catch (err) {
        this.rejectionHandler.show(err);
        return;
      }
      try {
        await this.testValidator.validateCode(model.code, login.userId);
      } catch (err) {
        this.rejectionHandler.show(err);
        await this.logout();
        return;
      }
      await this.authenticationCheck();
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

    try {
      await this.person.registerParticipant(model).toPromise();
    } catch (err) {
      this.rejectionHandler.show(err);
    }

    await this.login(model);
  };

  async logout() {
    try {
      await this.person.logout().toPromise();
    } catch (e) {
      //
    }

    this.aclService.flushRoles();
    this.aclService.attachRole('guest');
    this.router.navigateByUrl('/');
  };
}
