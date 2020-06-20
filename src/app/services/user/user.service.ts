// tslint:disable: no-inferrable-types
// tslint:disable: variable-name
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/User.model';
import { URL_SERVICES } from '../../config/config';
import { UploadFilesService } from '../uploads/upload-files.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = URL_SERVICES;

  user: User;
  token: string;
  id: string;
  menu: any[] = [];

  constructor(public http: HttpClient, public router: Router,
              public _uploadFilesService: UploadFilesService) {
    this.loadFromLocalStorage();
  }

  renewToken() {

    return this.http.get( `${ this.url }/login/renewtoken?token=${ this.token }` )
            .pipe(map( (resp: any) => {

              this.token = resp.token;
              localStorage.setItem('token', this.token);
              console.log('token %cRenewed', 'color: lightseagreen');

              return true;
            }),
              catchError( (err) => {
                this.router.navigate(['/login']);
                swal.fire( 'Error al renovar el token', 'No fue posible renovar el token', 'error' );
                return throwError(err);
              })
            );

  }

  isLoggedIn(): boolean {
    return ( this.token.length > 5 ) ? true : false;
  }

  loadFromLocalStorage() {

    if ( localStorage.getItem( 'token' ) ) {
      this.id = localStorage.getItem( 'id' );
      this.token = localStorage.getItem( 'token' );
      this.user = JSON.parse( localStorage.getItem( 'user' ) );
      this.menu = JSON.parse( localStorage.getItem( 'menu' ) );
    } else {
      this.id = null;
      this.token = '';
      this.user = null;
      this.menu = [];
    }
  }

  saveInLocalStorage( id: string, token: string, user: User, menu: any ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.id = id;
    this.user = user;
    this.token = token;
    this.menu = menu;

  }

  logOut() {

    this.id = null;
    this.token = '';
    this.user = null;
    this.menu = [];

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginGoogle( token: string ) {

    return this.http.post( this.url + '/login/google', { token } )
                    .pipe(map( (resp: any) => {
                      this.saveInLocalStorage( resp.id, resp.token, resp.usuario, resp.menu );
                      return true;
                    }));

  }

  login( user: User, remember: boolean = false ) {

    if ( remember ) { localStorage.setItem( 'email', user.email ); }
    else { localStorage.removeItem( 'email' ); }

    return this.http.post( this.url + '/login', user )
                  .pipe(map( (resp: any) => {
                    this.saveInLocalStorage( resp.id, resp.token, resp.usuario, resp.menu );
                    return true;
                  }),
                  catchError( err => {
                    swal.fire( 'Login Incorrecto', err.error.message, 'error' );
                    return throwError(err);
                  })
                  );

  }

  // =================================
  // CRUD User
  // =================================

  // -- POST -- //
  createUser( user: User ) {

    return this.http.post( this.url + '/usuario', user )
                  .pipe(map( (resp: any) => {
                      swal.fire({ title: 'Usuario creado', text: user.email, icon: 'success' });
                      return resp.usuario;
                    }
                  ),
                  catchError( err => {
                    swal.fire( err.error.message, err.error.errors.message, 'error' );
                    return throwError(err);
                  }));

  }

  // -- GET -- //
  loadUsers( desde: number = 0 ) {

    let tempUrl = this.url + '/usuario';
    if ( desde > 0) { tempUrl += '?desde=' + desde; }

    return this.http.get( tempUrl );
  }

  findUsers( term: string ) {
    const url = `${ this.url }/busqueda/coleccion/usuarios/${ term }`;

    return this.http.get( url ).pipe(map( (resp: any) => resp.usuarios ));
  }

  // -- PUT -- //
  updateUser( user: User ) {

    const tempUrl = this.url + `/usuario/${ user._id }?token=${ this.token }`;

    return this.http.put( tempUrl , user )
            .pipe(map( (resp: any) => {

              if ( user._id === this.user._id ) { // sólo si se actualizan los datos de usuario actual
                console.log('%cUsuario actualizado', 'color: lightgreen');
                const userDB: User = resp.usuario;
                this.saveInLocalStorage( userDB._id, this.token, userDB, this.menu );
              }
              swal.fire({ title: 'Usuario Actualizado', text: user.nombre, icon: 'success' });
              return true;

            }),
            catchError( err => {
              swal.fire( err.error.message, err.error.errors.message, 'error' );
              return throwError(err);
            }));

  }

  // -- DELETE -- //
  deleteUser( id: string ) {

    const url = `${ this.url }/usuario/${ id }?token=${ this.token }`;

    return this.http.delete( url ).pipe(map( resp => {
      swal.fire(
        'Usuario Borrado',
        'El usuario ha sido borrado correctamente',
        'success'
      );
      return true;
    }));

  }

  // =================================
  // Images
  // =================================

  updloadFile( archivo: File, id: string ) {

    // -- Vanilla JS call -- //

    // this._uploadFilesService.uploadFileJS( archivo, 'usuarios', id )
    //         .then ( (resp: any) => {

    //           this.user.img = resp.usuario.img;
    //           swal.fire({ title: 'Imagen Actualizada', text: this.user.nombre, icon: 'success' });
    //           this.saveInLocalStorage( id, this.token, this.user );

    //         })
    //         .catch( error => {
    //           console.error( error );
    //         });

    // -- Angular CRUD call -- //

    this._uploadFilesService.uploadFile( archivo, 'usuarios', id )
          .subscribe( (resp: any) => {

            this.user.img = resp.usuario.img;
            swal.fire({ title: 'Imagen Actualizada', text: this.user.nombre, icon: 'success' });
            this.saveInLocalStorage( id, this.token, this.user, this.menu );

          }, error => {
            console.error( error );
          });


  }

}
