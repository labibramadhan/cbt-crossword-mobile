import { Component, OnInit } from '@angular/core';

import { PersonApi } from '../../../lib/loopback-sdk/services';
import { Router } from '@angular/router';

@Component({
  selector: 'page-test-finish',
  templateUrl: 'finish.html'
})
export class TestFinishPage implements OnInit {
  constructor(
    private person: PersonApi,
    private router: Router
  ) { }

  async ngOnInit() {
    try {
      await this.person.logout().toPromise();
    } catch (e) {
      //
    }
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 3000);
  }
}
