// tslint:disable: variable-name
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { User, Medico, Hospital } from '../../models';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  medics: Medico[] = [];
  hospitals: Hospital[] = [];

  constructor( public activatedRoute: ActivatedRoute, public http: HttpClient ) {
    this.activatedRoute.params.subscribe( params => {
      const term = params.term;
      this.search( term );
    });
  }

  ngOnInit(): void {
  }

  search( term: string ) {

    const url = URL_SERVICES + '/busqueda/todo/' + term;

    this.http.get( url ).subscribe( ( resp: any ) => {
      // console.log(resp);
      this.users = resp.usuarios;
      this.medics = resp.medicos;
      this.hospitals = resp.hospitales;
    });

  }

}
