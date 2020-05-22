// tslint:disable: variable-name
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

interface Settings {
  themeUrl: string;
  theme: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    themeUrl: 'assets/css/colors/default-dark.css',
    theme: 'default-dark'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.loadSettings();
  }

  saveSettings() {
    console.log('Saved correctly on localStorage');
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
      // console.log('Loaded correctly from localStorage');
      this.applyTheme( this.settings.theme );
    } else {
      // console.log('Loaded default settings');
      this.applyTheme( this.settings.theme );
    }

  }

  applyTheme( theme: string ) {

    const url = `assets/css/colors/${ theme }.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.settings.theme = theme;
    this.settings.themeUrl = url;

    this.saveSettings();

  }

}
