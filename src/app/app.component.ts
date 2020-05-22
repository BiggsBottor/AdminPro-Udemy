// tslint:disable: variable-name
import { Component } from '@angular/core';
import { SettingsService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AdminPro';

  constructor(public _settings: SettingsService) {}
}
