// tslint:disable: no-inferrable-types
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public hide: boolean = true;

  public notification = new EventEmitter<any>(); // retorna el objeto de carga de imagenes;

  constructor() {}

  hideModal() {
    this.hide = true;
    this.tipo = null;
    this.id = null;
  }

  showModal( tipo: string, id: string ) {
    this.hide = false;
    this.tipo = tipo;
    this.id = id;
  }
}
