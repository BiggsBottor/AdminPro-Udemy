import { Injectable } from '@angular/core';
import { URL_SERVICES } from './../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  constructor( public http: HttpClient ) { }

  // ==============================================
  // IMPORTANT: Angular refactored version.
  // ==============================================

  uploadFile( archivo: File, tipo: string, id: string ) {

    const url = `${ URL_SERVICES }/upload/${ tipo }/${ id }`;
    const formData: FormData = new FormData();

    formData.append( 'imagen', archivo, archivo.name );

    return this.http.put( url, formData, { reportProgress: true } );

  }

  // ==============================================
  // IMPORTANT: Vanilla JavaScript version.
  // ==============================================

  uploadFileJS( archivo: File, tipo: string, id: string ) {

    return new Promise( (resolve, reject) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );

      xhr.onreadystatechange = () => {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.error( 'Fallo al subir la imagen' );
            reject( JSON.parse( xhr.response ) );
          }

        }

      };

      const url = `${ URL_SERVICES }/upload/${ tipo }/${ id }`;

      xhr.open('PUT', url, true);
      xhr.send( formData );

    });

  }

}
