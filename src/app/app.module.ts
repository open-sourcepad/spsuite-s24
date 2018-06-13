import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { AppComponent } from './app.component';

import { SocialLoginModule } from "angularx-social-login";
import { LoginOpt, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { LoginComponent } from './login/login.component';
import { routing } from './app.routes';
import { provideConfig } from './providerconfig'

// ADDED----
import { ToastyModule } from 'ng2-toasty';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import {
  HttpService,
  CommonService,
  LocalStorage,
  ToasterService
} from './services/util';

import {
  SessionService
} from './services/api';

import {
  AuthGuard 
} from './services/route-guards'

const PROVIDERS = [
  {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  },
  {
    provide: GoogleLoginProvider,
    useFactory: provideConfig
  },
  HttpService,
  CommonService,
  LocalStorage,
  SessionService,
  ToasterService,
  AuthGuard
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SocialLoginModule,
    RouterModule,
    ToastyModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    routing
  ],
  providers: [
    PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
