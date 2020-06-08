// tslint:disable: variable-name
import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  title: string;

  constructor(private router: Router, _title: Title, meta: Meta) {

    this.getDataRoute()
      .subscribe( data => {
        this.title = data.title;
        if (data.title === undefined) { this.title = ''; }
        _title.setTitle(`${this.title} AdminPro`);

        const metaTag: MetaDefinition = {
          name: 'description',
          content: this.title
        };

        meta.updateTag( metaTag );

      } );

  }

  ngOnInit(): void {
  }

  getDataRoute() {
    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        filter( ( event: ActivationEnd ) => event.snapshot.firstChild === null ),
        map( ( event: ActivationEnd) => event.snapshot.data )
      );
  }

}
