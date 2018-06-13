import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../util/http.service';
import { CommonService } from '../util/common.service';
import { LocalStorage } from '../util/localStorage.service';
import { Subject }    from 'rxjs';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Injectable()
export class SessionService {
  private apiEndpoint = `${environment.api_url}/api`;
 
  user:any = null;
  UserSource = new Subject<any>();
  // Observable user streams
  user$ = this.UserSource.asObservable();
 
    constructor(
      public storage: LocalStorage,
      public commonService: CommonService,
      public router: Router,
      public http: HttpService,
      private location: Location,) {}

  authenticate(payload: any): any {
    return this.http.post(`${this.apiEndpoint}`, payload , true);
  }

  verifySsoToken(payload: any){
    return this.http.post(`${this.apiEndpoint}/sso/validate_token`, payload , true);
  }

  refreshSsoToken(){
    return this.http.get(`${this.apiEndpoint}/sso/show`);
  }

  deleteSession(){
    return this.http.delete(`${this.apiEndpoint}/sso/destroy_token`);
  }

  checkSession(): any {
    return this.http.get(`${this.apiEndpoint}/show`);
  }

  setSession(user: any): void {
    this.UserSource.next(user);
    this.storage.set('currentUser', JSON.stringify(user));
    this.user =  this.getCurrentUser();
  }

  signOut(): void {
    this.http.delete(`${this.apiEndpoint}/sso/destroy_token`).subscribe((res) => {
      this.clearSession();
      this.UserSource.next(null);
      window.location.href = environment.sign_in_url+"?url="+environment.base_url+this.location.path()+"&do=sign-out";
    },err => {
      console.log("unable to clear session", err)
     });
  }
  
  getCurrentUser(): any {
    return this.storage.getObject('currentUser');
  }

  clearSession(): void {
    this.storage.clear();
    // this.router.navigate(['/']);
  }

  userSignedIn(): boolean {
    return !!this.storage.get('accessToken');
  }

}
