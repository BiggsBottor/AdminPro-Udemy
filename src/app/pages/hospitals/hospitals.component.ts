// tslint:disable: variable-name
// tslint:disable: no-inferrable-types
import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, ModalUploadService } from '../../services';
// import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  desde: number = 0;
  totalRegisters: number = 0;
  loading: boolean = true;

  constructor( public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.loadHospitals();

    this._modalUploadService.notification.subscribe( () => this.loadHospitals() );
  }

  showModal( id: string ) {
    this._modalUploadService.showModal( 'hospitales', id );
  }

  createHospital() {

    swal.fire({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del Hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar'
    })
    .then((newHospital: any) => {

      if ( !newHospital || newHospital.length <= 0 ) { return; }

      if (newHospital.value) {
        if ( typeof newHospital.value === 'string' ) {
          this._hospitalService.createHospital( newHospital.value ).subscribe( () => this.loadHospitals() );
        }
      }

    });

  }

  loadHospitals() {

    this.loading = true;

    this._hospitalService.loadHospitals( this.desde )
          // .subscribe( (resp: any) => {
          .subscribe( (hospitals: any) => {

            // if ( resp.hospitales.length <= 0 ) {
            if ( hospitals.length <= 0 ) {
              this.desde -= 5;
              this.loadHospitals();
              return;
             }

            // this.totalRegisters = resp.total;
            // this.hospitals = resp.hospitales;
            this.totalRegisters = this._hospitalService.total;
            this.hospitals = hospitals;
            this.loading = false;

          });

  }

  updateList( valor: number ) {

    const desde = this.desde + valor;

    if (desde >= this.totalRegisters ) { return; }
    if (desde < 0 ) { return; }

    this.desde += valor;
    this.loadHospitals();
  }

  findHospitals( term: string ) {

    if (term.length <= 0) {
      this.loadHospitals();
      return;
    }

    this.loading = true;

    this._hospitalService.findHospitals( term ).subscribe( (hospitals: Hospital[]) => {

      this.hospitals = hospitals;
      this.loading = false;

    });
  }

  deleteHospital( hospital: Hospital ) {

    swal.fire({
      title: '¿Está seguro?',
      html: 'Está seguro de que quiere borrar el <br><b>' + hospital.nombre + '</br>',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Borrar',
    })
    .then(( isDeleted ) => {
      if (isDeleted.value) {
        this._hospitalService.deleteHospital( hospital._id )
          .subscribe( (deleted: boolean) => {
            console.log('%cHospital borrado ', 'color: red', deleted );
            this.loadHospitals();
          });
      }
    });

  }

  saveHospital( hospital: Hospital ) {
    this._hospitalService.updateHospital( hospital ).subscribe();
  }

}
