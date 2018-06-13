import { ActivatedRoute, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionService} from '../api';
import { Observable, Subject } from 'rxjs';
import { catchError, map, flatMap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import {environment } from '../../../environments/environment'
import { Location } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {
  user;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private session: SessionService,
    private location: Location
  ) {

  }

  private userState: Observable<boolean>;

  private userSubject = new Subject<boolean>();
  private observer;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {

    this.userState =  new Observable(((observer)=>{
      this.processLogin(route.queryParams,observer);
    }));
    
    return this.userState.pipe(
      map(e => {
        if (e) {
          console.log("returned true");
          return true;
        } else {
          console.log("returned false");
          return false
        }
      }),
      catchError((err) => {
        console.log("error",err)
        // this.router.navigate(['/login']);
        return of(false);
      })
    );
   
  }


  processLogin(routeParams,observer){
    let user = this.session.getCurrentUser()
    debugger
    if(this.session.getCurrentUser()==null){
      debugger
      if(routeParams.sso != null){
        this.verifySsoToken(routeParams,observer); 
      }else{
        observer.next(false); 
        observer.complete();
        window.location.href = environment.sign_in_url+"?url="+environment.base_url+this.location.path();;
      }
    }else{
      observer.next(true); //user is already logged in
      observer.complete();
      // this.getNewSsoToken();
    }
  }

  // getNewSsoToken(){
  //   debugger
  //   this.session.refreshSsoToken().subscribe((res) => {
  //     this.location.replaceState('', '')
  //     console.log("user is updated");
  //     this.session.setSession(res.user);
  //     alert("welcome");
  //   },err => {
  //     this.observer.next(false); //user is already logged in
  //     this.observer.complete();
  //    });
  // }


  verifySsoToken(routeParams,observer){
    debugger
    this.session.verifySsoToken({sso_token:routeParams.sso,email:routeParams.email}).subscribe((res) => {
      this.session.setSession(res.user);
      debugger
      observer.next(true); //user is logged in
      observer.complete();
    },err => {
      debugger
      console.log("error","invalid sso token")
      observer.next(false); //user is already logged in
      observer.complete();
      
     });
  }
}