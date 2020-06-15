// tslint:disable: no-inferrable-types
// tslint:disable: variable-name
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { UploadFilesService, ModalUploadService } from '../../services';
// import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  imageToUpload: File;
  imageTemp: string | ArrayBuffer;

  constructor(public _updloadFilesService: UploadFilesService, public _modalUploadService: ModalUploadService) {}

  // modifica el texto del archivo para que se muestre entero
  updateLabelText( fichero: any, texto: any ) {

    if ( fichero.files.length > 0 ) { texto.innerHTML = fichero.files[0].name; }

  }

  ngOnInit(): void {
  }

  closeModal() {
    this.imageToUpload = null;
    this.imageTemp = null;

    this._modalUploadService.hideModal();
  }

  selectImage( archivo: File ) {

    if ( !archivo ) {
      this.imageToUpload = null;
      return;
    }

    if ( archivo.type.indexOf( 'image' ) < 0 ) {

      swal.fire( 'Sólo Imágenes', 'El archivo seleccionado no es una imagen', 'error' );
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

  uploadImage() {
    this._updloadFilesService.uploadFile( this.imageToUpload, this._modalUploadService.tipo, this._modalUploadService.id )
          .subscribe( resp => {

            this._modalUploadService.notification.emit( resp );
            this.closeModal();

          }, err => {
            console.log ( '%cError en la carga...', 'color: red', err );
          });
  }

}
