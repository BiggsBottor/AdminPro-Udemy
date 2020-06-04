import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = URL_SERVICES;

  user: User;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    // console.log('%cServicio de usuario listo', 'color: teal');
    this.loadFromLocalStorage();
  }

  isLoggedIn(): boolean {
    return ( this.token.length > 5 ) ? true : false;
  }

  loadFromLocalStorage() {

    if ( localStorage.getItem( 'token' ) ) {
      this.token = localStorage.getItem( 'token' );
      this.user = JSON.parse( localStorage.getItem( 'user' ) );
    } else {
      this.token = '';
      this.user = null;
    }
  }

  saveInLocalStorage( id: string, token: string, user: User ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;

  }

  logOut() {

    this.token = '';
    this.user = null;

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {

    return this.http.post( this.url + '/login/google', { token } )
                    .pipe(map( (resp: any) => {
                      this.saveInLocalStorage( resp.id, resp.token, resp.usuario );
                      return true;
                    }));

  }

  login( user: User, remember: boolean = false ) {

    if ( remember ) { localStorage.setItem( 'email', user.email ); }
    else { localStorage.removeItem( 'email' ); }

    return this.http.post( this.url + '/login', user )
                  .pipe(map( (resp: any) => {

                    // localStorage.setItem('id', resp.id);
                    // localStorage.setItem('token', resp.token);
                    // localStorage.setItem('user', JSON.stringify(resp.user));
                    this.saveInLocalStorage( resp.id, resp.token, resp.usuario );

                    return true;

                  }));

  }

  createUser( user: User ) {

    return this.http.post( this.url + '/usuario', user )
                  .pipe(map( (resp: any) => {
                      swal.fire({ title: 'Usuario creado', text: user.email, icon: 'success' });
                      return resp.usuario;
                    }
                  ));

  }
}
