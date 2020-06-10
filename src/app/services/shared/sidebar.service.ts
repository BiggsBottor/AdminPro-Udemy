import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Progress Bar', url: '/progress' },
        { title: 'Gráficas', url: '/charts1' },
        { title: 'Promesas', url: '/promises' },
        { title: 'RxJs', url: '/rxjs' }
      ]
    },
    {
      title: 'Mantenimento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios', url: '/usuarios' },
        { title: 'Hospitales', url: '/hospitales' },
        { title: 'Médicos', url: '/medicos' }
      ]
    }
  ];

  constructor() { }
}
