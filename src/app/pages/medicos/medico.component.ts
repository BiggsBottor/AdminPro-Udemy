// tslint:disable: variable-name
// tslint:disable: no-inferrable-types
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HospitalService, MedicoService, ModalUploadService } from '../../services';
import { Hospital, Medico } from '../../models';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitals: Hospital[] = [];
  medico: Medico = new Medico( '', '', '', '', '' );
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
    ) {

      this.activatedRoute.params.subscribe( params => {

        const id = params.id;

        if ( id !== 'nuevo' ) { this.loadMedicByID( id ); }

      });

    }

  ngOnInit(): void {

    // this._hospitalService.loadHospitals().subscribe( hospitals => this.hospitals = hospitals );
    this._hospitalService.loadHospitals(0, true).subscribe( hospitals => this.hospitals = hospitals );

    this._modalUploadService.notification.subscribe( resp => {

      this.medico.img = resp.medico.img;

    });

  }

  loadMedicByID( id: string ) {

    this._medicService.loadMedicByID( id ).subscribe( medic => {

      this.medico = medic;
      this.medico.hospital = medic.hospital._id;
      this.updateHospital( this.medico.hospital );

    });

  }

  updateHospital( id: string ) {

    this._hospitalService.loadHospitalByID( id ).subscribe( hospital => this.hospital = hospital );

  }

  showModal( id: string ) {
    this._modalUploadService.showModal( 'medicos', id );
  }

  saveMedic( f: NgForm ) {

    if ( f.invalid ) { return; }

    this._medicService.saveMedic( this.medico )
        .subscribe( medic => {

          this.medico._id = medic._id;

          this.router.navigate([ '/medico', medic._id ]);

        });

  }

}
