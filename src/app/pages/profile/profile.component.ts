// tslint:disable: variable-name
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services';
import { User } from '../../models/User.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [`
    /* css añadido para podes desplazar el texto
    del input cuando el nombre del arcivo es demasiado largo */
    #texto{
      display: inline-block;
      word-wrap: break-word;
      max-width: 100%;
      font: 400 13.3333px;
    }
  `]
})
export class ProfileComponent implements OnInit {

  user: User;
  imageToUpload: File;
  imageTemp: string | ArrayBuffer;

  constructor(public _userService: UserService) {
    this.user = this._userService.user;
  }

  // modifica el texto del archivo para que se muestre entero
  updateLabelText( fichero: any, texto: any ) {

    if ( fichero.files.length > 0 ) { texto.innerHTML = fichero.files[0].name; }

  }

  ngOnInit(): void {
  }

  updateUserData( user: User ) {

    this.user.nombre = user.nombre;
    !this.user.google ? this.user.email = user.email : user.email = this.user.email;

    this._userService.updateUser( user ).subscribe();

  }

  selectImage( archivo: File ) {

    if ( !archivo ) {
      this.imageToUpload = null;
      return;
    }

    if ( archivo.type.indexOf( 'image' ) < 0 ) {

      swal.fire({ title: 'Sólo Imágenes', text: 'El archivo seleccionado no es una imagen', icon: 'error' });
      this.imageToUpload = null;
      return;

    }

    this.imageToUpload = archivo;

    // -- Vanilla JS -- //

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL ( archivo );

    reader.onloadend = () => this.imageTemp = reader.result;

    // -- Vanilla JS -- //

  }

  updateImage() {

    this._userService.updloadFile( this.imageToUpload, this.user._id );

  }

}
