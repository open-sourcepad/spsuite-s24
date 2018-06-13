import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { LocalStorage } from './localStorage.service';
import { CommonService } from './common.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import { map, catchError, retry } from "rxjs/operators";
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/throw';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Injectable()
export class HttpService {

  private toastOptions: ToastOptions;

  constructor(
      private storage: LocalStorage,
      private commonService: CommonService,
      private toastyService: ToastyService,
      private toastyConfig: ToastyConfig,
      private router: Router,
      private http: Http,
      private slimLoadingBarService: SlimLoadingBarService
    ) {
      this.toastyConfig.theme = 'material';
      this.toastOptions = {
        title: 'Error',
        showClose: true,
        timeout: 10000,
        theme: 'material',
      };
    }

  createAuthorizationHeader(headers: Headers, skipAuth? :boolean): void {
    if(!!skipAuth) {
      headers.append('Content-Type', 'application/json');
    } else {
      let currentUser = this.storage.getObject('currentUser');
      headers.append('Content-Type', 'application/json');
      headers.append('AccessToken', currentUser.access_token);
      headers.append('SsoToken', currentUser.sso_token);
      headers.append('UserId', currentUser.id);
    }
  }

  get(url, skipAuth? :boolean): any {
    this.slimLoadingBarService.start();
    const headers = new Headers();
    this.createAuthorizationHeader(headers,skipAuth);
    return this.http.get(url, {
      headers: headers
    }).pipe(
      map(this.commonService.extractData),
      catchError(res => {
        return this.commonErrorHandler(res);
      })
    );
  }

  post(url, data, skipAuth? :boolean): any {
    this.slimLoadingBarService.start();
    const headers = new Headers();
    this.createAuthorizationHeader(headers, skipAuth);
    return this.http.post(url, data, {
      headers: headers,
    }).pipe(
      map(this.commonService.extractData),
      catchError(res => {
        return this.commonErrorHandler(res);
      })
    );
  }

  patch(url, data,skipAuth? :boolean): any {
    this.slimLoadingBarService.start();
    const headers = new Headers();
    this.createAuthorizationHeader(headers,skipAuth);
    return this.http.patch(url, data, {
      headers: headers
    }).pipe(
      map(this.commonService.extractData),
      catchError(res => {
        return this.commonErrorHandler(res);
      })
    );
  }

  put(url, data, skipAuth? :boolean):any {
    this.slimLoadingBarService.start();
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers
    }).pipe(
      map(this.commonService.extractData),
      catchError(res => {
        return this.commonErrorHandler(res);
      })
    );
  }

  delete(url): any {
    this.slimLoadingBarService.start();
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    }).pipe(
      map(this.commonService.extractData),
      catchError(res => {
        return this.commonErrorHandler(res);
      })
    );
  }

  private commonErrorHandler(res: any) {
    const body = res.json() || '';
    // if (body.errors) {
    //   body.errors.forEach((err) => {
    //     if (res.status === 401) {
    //       this.displayToast(err);
    //     }
    //   });
    // } else {
    //   const err = body.error || JSON.stringify(body);
    //   if (res.status === 401) {
    //     this.displayToast(err);
    //   }
    // }
    // if(res.status == 401) {
    //   this.storage.clear();
    //   this.router.navigateByUrl('/login');
    // }
    return this.commonService.handleError(res);
  }

  private displayToast(msg) {
    this.toastOptions.msg = msg;
    this.toastyService.error(this.toastOptions);
  }
}
