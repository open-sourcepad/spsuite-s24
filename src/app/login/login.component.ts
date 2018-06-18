import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SessionService } from '../services/api/session';
import { environment } from '../../environments/environment'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorage } from '../services/util'
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: SocialUser;
  // private loggedIn: boolean;

  constructor(
    private authService: AuthService,
    private session: SessionService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private localStorage: LocalStorage
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(routeParams => {
      if(routeParams.sso!=null){
        console.log("path is "+this.location.path().split("?")[0])
        this.location.replaceState(this.location.path().split("?")[0])
      }
    
    });
  }

  logout(){
    this.session.signOut()
  }


}
