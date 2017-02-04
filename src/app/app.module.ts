import { BROWSER_STORAGE_PROVIDERS, WebStorageModule } from "h5webstorage";
import { Crossword, CrosswordCell } from '../pages/test/components/crossword/crossword';
import { ErrorHandler, NgModule } from '@angular/core';
import { FieldError, FieldTypeInput } from '../lib/form/fields/fields';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateStaticLoader } from 'ng2-translate';

import { AclService } from 'angular2-acl';
import { AuthLoginPage } from '../pages/auth/login/login';
import { AuthPage } from '../pages/auth/auth';
import { AuthRegistrationPage } from '../pages/auth/registration/registration';
import { AuthenticationService } from '../services/authentication';
import { BrowserModule } from '@angular/platform-browser';
import { FormGenerator } from '../lib/form/form';
import { MyApp } from './app.component';
import { RejectionHandler } from '../services/rejection-handler';
import { SDKBrowserModule } from '../lib/loopback-sdk/';
import { TestFinishPage } from '../pages/test/finish/finish';
import { TestPage } from '../pages/test/test';
import { TestScorePage } from '../pages/test/score/score';
import { TestValidator } from '../services/test-validator';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthPage
  },
  {
    path: 'test/fill/:code',
    component: TestPage
  },
  {
    path: 'test/score/:id',
    component: TestScorePage
  },
  {
    path: 'test/finish',
    component: TestFinishPage
  }
];

@NgModule({
  declarations: [
    MyApp,
    AuthPage,
    AuthLoginPage,
    AuthRegistrationPage,
    Crossword,
    CrosswordCell,
    TestPage,
    TestScorePage,
    TestFinishPage,
    FieldError,
    FieldTypeInput,
    FormGenerator
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    HttpModule,
    WebStorageModule,
    SDKBrowserModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '../assets/i18n', '.json'),
      deps: [Http]
    }),
    FormsModule,
    ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    AuthLoginPage,
    AuthRegistrationPage,
    Crossword,
    CrosswordCell,
    TestPage,
    TestScorePage,
    TestFinishPage
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    BROWSER_STORAGE_PROVIDERS,
    RejectionHandler,
    AclService,
    AuthenticationService,
    TestValidator
  ]
})
export class AppModule { }
