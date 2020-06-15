// tslint:disable: variable-name
// tslint:disable: no-inferrable-types
import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService, ModalUploadService } from '../../services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medics: Medico[] = [];
  desde: number = 0;
  loading: boolean = true;

  constructor(public _medicoService: MedicoService, public _modalUploadService: ModalUploadService) { }

  hospitalName( hospital: any ): string {
    return hospital.nombre;
  }

  ngOnInit(): void {
    this.loadMedics();

    this._modalUploadService.notification.subscribe( () => this.loadMedics() );
  }

  findMedics(term: string ) {

    if (term.length <= 0) {
      this.loadMedics();
      return;
    }

    this.loading = true;

    this._medicoService.findMedics( term ).subscribe( (medico: Medico[]) => {

      this.medics = medico;
      this.loading = false;

    });
  }

  updateList( valor: number ) {

    const desde = this.desde + valor;

    if (desde >= this._medicoService.total ) { return; }
    if (desde < 0 ) { return; }

    this.desde += valor;
    this.loadMedics();
  }

  loadMedics() {

    this.loading = true;

    this._medicoService.loadMedics( this.desde )
          .subscribe( (medics: any) => {

            if ( medics.length <= 0 ) {
              this.desde -= 5;
              this.loadMedics();
              return;
             }

            this.medics = medics;
            this.loading = false;

          });

  }

  deleteMedic( medic: Medico ) {

    swal.fire({
      title: '¿Está seguro?',
      html: 'Está seguro de que quiere borrar a <br><b>' + medic.nombre + '</br>',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Borrar',
    })
    .then(( isDeleted ) => {
      if (isDeleted.value) {
        this._medicoService.deleteMedic( medic._id )
          .subscribe( (deleted: boolean) => {
            console.log('%cMédico borrado ', 'color: red', deleted );
            this.loadMedics();
          });
      }
    });

  }

}
