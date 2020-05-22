// tslint:disable: variable-name
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _settings: SettingsService ) { }

  ngOnInit(): void {
    this.putCheck();
  }

  cambiarTema( theme: string, link: any ) {

    this.applyCheck(link);

    this._settings.applyTheme( theme );

  }

  applyCheck( link: any ) {
    const selectores: any = document.getElementsByClassName('selector');

    for (const ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  putCheck() {
    const selectores: any = document.getElementsByClassName('selector');

    const theme = this._settings.settings.theme;

    for (const ref of selectores) {
      if (ref.getAttribute('data-theme') === theme ) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
