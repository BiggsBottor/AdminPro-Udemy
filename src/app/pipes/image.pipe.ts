import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): string {

    let url = URL_SERVICES + '/img';

    if ( !img ) { return url + '/usuarios/xxx'; } // no-image

    if ( img.indexOf('https') >= 0 ) { return img; } // si es imagen de google

    switch ( tipo ) {
      case 'usuarios':
      case 'medicos':
      case 'hospitales':
        url += `/${ tipo }/${ img }`;
        break;
      default:
        console.log(`el tipo de imagen ${ tipo } no existe. Debe de ser usuarios, medicos u hospitales`);
        url += '/usuarios/xxx';
    }

    return url;
  }

}
