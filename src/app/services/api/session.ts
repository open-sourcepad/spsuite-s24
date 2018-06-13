import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../util/http.service';
import { CommonService } from '../util/common.service';
import { LocalStorage } from '../util/localStorage.service';
import { Subject }    from 'rxjs';
import { environment } from '../../../environments/environment';

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
      public http: HttpService) {}

  authenticate(payload: any): any {
    return this.http.post(`${this.apiEndpoint}`, payload , true);
  }

  verifySsoToken(payload: any){
    return this.http.post(`${this.apiEndpoint}/sso/validate_token`, payload , true);
  }

  refreshSsoToken(){
    return this.http.get(`${this.apiEndpoint}/sso/show`);
  }


  checkSession(): any {
    return this.http.get(`${this.apiEndpoint}/show`);
  }

  setSession(user: any): void {
    this.UserSource.next(user);
    this.storage.set('currentUser', JSON.stringify(user));
    this.user =  this.getCurrentUser();
  }

  signout(): void {
    this.clearSession();
    this.UserSource.next(null);
    // this.http.delete(this.apiEndpoint).subscribe();
  }
  
  getCurrentUser(): any {
    return this.storage.getObject('currentUser');
  }

  clearSession(): void {
    this.storage.clear();
    this.router.navigate(['/']);
  }

  userSignedIn(): boolean {
    return !!this.storage.get('accessToken');
  }

}
