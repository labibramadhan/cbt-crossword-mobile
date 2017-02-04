import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

import { AuthPage } from '../pages/auth/auth';
import { TranslateService } from 'ng2-translate';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;

  rootPage = AuthPage;

  constructor(
    platform: Platform,
    translate: TranslateService,
    private toast: ToastController
  ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    translate.setDefaultLang('en');
    translate.use('en');
  }
}
