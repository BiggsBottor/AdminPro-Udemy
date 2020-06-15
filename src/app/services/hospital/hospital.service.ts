// tslint:disable: variable-name
// tslint:disable: no-inferrable-types
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  url = URL_SERVICES;

  // token: string;

  total: number = 0;

  hospitals: Hospital[] = [];

  constructor( public http: HttpClient, public _userService: UserService ) {}

  // ==================
  // CRUD de Hospitales
  // ==================

  // -- POST -- //
  createHospital( nombre: string ) {

    return this.http.post( this.url + '/hospital?token=' + this._userService.token, { nombre } )
          .pipe(map( (resp: any) => {
              swal.fire( 'Hospital creado', nombre, 'success' );
              return resp.hospital;
            }
          ));

  }

  // -- GET -- //
  loadHospitals( desde: number = 0, todos: boolean = false ) {

    let tempUrl = this.url + '/hospital';
    if ( desde > 0) { tempUrl += '?desde=' + desde; }
    if ( todos ) { tempUrl += '/todos'; } // desde debe ser = 0;

    return this.http.get( tempUrl )
                    .pipe(map( (resp: any) => {
                      this.total = resp.total;
                      return resp.hospitales;
                    }));

  }

  loadHospitalByID( id: string ) {

    return this.http.get( this.url + '/hospital/' + id ).pipe(map( (resp: any) => resp.hospital ));

  }

  findHospitals( term: string ) {
    const url = `${ this.url }/busqueda/coleccion/hospitales/${ term }`;

    return this.http.get( url ).pipe(map( (resp: any) => resp.hospitales ));
  }

  // -- PUT -- //
  updateHospital( hospital: Hospital ) {

    const tempUrl = this.url + `/hospital/${ hospital._id }?token=${ this._userService.token }`;

    return this.http.put( tempUrl , hospital )
            .pipe(map( (resp: any) => {

              swal.fire( 'Hospital Actualizado', hospital.nombre, 'success' );
              return resp.hospital;

            }));

  }


  // -- DELETE -- //
  deleteHospital( id: string ) {

    const url = `${ this.url }/hospital/${ id }?token=${ this._userService.token }`;

    return this.http.delete( url ).pipe(map( () => {
      swal.fire(
        'Hospital Borrado',
        'El Hospital ha sido borrado correctamente',
        'success'
      );
      return true;
    }));

  }

}
