// tslint:disable: variable-name
// tslint:disable: no-inferrable-types
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICES } from '../../config/config';
import { UserService } from '../user/user.service';
import swal from 'sweetalert2';
import { Medico } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  url = URL_SERVICES;

  total: number = 0;

  constructor(public http: HttpClient, public _userService: UserService) { }

  // ==================
  // CRUD de Hospitales
  // ==================

  // -- PUT -- //
  // -- POST -- //
  saveMedic( medic: Medico ) {

    let id = '';

    if ( medic._id ) { id = `/${medic._id}/`; }

    const url = `${ this.url }/medico${ id }?token=${ this._userService.token }`;

    if ( medic._id ) {
      return this.http.put( url, medic ).pipe(map( (resp: any) => {
        swal.fire( 'Médico Actualizado', medic.nombre, 'success' );
        return resp.medico;
      }));
    } else {
        return this.http.post( url, medic ).pipe(map( (resp: any) => {
          swal.fire( 'Médico Creado', medic.nombre, 'success' );
          return resp.medico;
        }));
    }

  }

  // -- GET -- //
  loadMedics( desde: number = 0 ) {

    let tempUrl = this.url + '/medico';
    if ( desde > 0) { tempUrl += '?desde=' + desde; }

    return this.http.get( tempUrl )
      .pipe(map( (resp: any) => {
        this.total = resp.total;
        return resp.medicos;
      }));

  }

  loadMedicByID( id: string ) {

    return this.http.get( this.url + '/medico/' + id ).pipe(map( (resp: any) => resp.medico ));

  }

  findHospitals( term: string ) {
    const url = `${ this.url }/busqueda/coleccion/hospitales/${ term }`;

    return this.http.get( url ).pipe(map( (resp: any) => resp.hospitales ));
  }

  findMedics( term: string ) {
    const url = `${ this.url }/busqueda/coleccion/medicos/${ term }`;

    return this.http.get( url ).pipe(map( (resp: any) => resp.medicos ));
  }

  // -- DELETE -- //
  deleteMedic( id: string ) {

    const url = `${ this.url }/medico/${ id }?token=${ this._userService.token }`;

    return this.http.delete( url ).pipe(map( () => {
      swal.fire(
        'Médico Borrado',
        'El Médico ha sido borrado correctamente',
        'success'
      );
      return true;
    }));

  }

}
