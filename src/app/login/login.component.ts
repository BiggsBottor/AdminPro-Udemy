// tslint:disable: no-inferrable-types
// tslint:disable: variable-name
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services';
import { User } from '../models/User.model';

declare function init_plugins(): any;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../assets/css/pages/login-register-lock.css']
})
export class LoginComponent implements OnInit {

  remember: boolean = false;
  _email: string;

  auth2: any;

  constructor(public router: Router, public _userService: UserService, public _ngZone: NgZone) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();

    this._email = localStorage.getItem('email') || '';
    if ( this._email.length > 1 ) { this.remember = true; }

  }

  googleInit() {

    gapi.load( 'auth2', () => {

      this.auth2 = gapi.auth2.init({

        client_id: '531389619985-ed6blqs0pa3dg3q5i9hmms9mjgpc2tc6.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }

  attachSignin(element: any) {

    this.auth2.attachClickHandler(element, {}, (googleUser: any) => {

      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this._userService.loginGoogle( token )
                    // .subscribe( () => window.location.href = '#/dashboard' );
                    .subscribe( () => this._ngZone.run( () => this.router.navigate( ['/dashboard'] )));
    });

  }

  onLogIn( forma: NgForm ) {

    if ( forma.invalid ) { return; }

    const fv = forma.value;

    const user = new User(null, fv.email, fv.password);

    this._userService.login( user, fv.remember )
                    .subscribe( () => this.router.navigate(['/dashboard']) );

  }

}
