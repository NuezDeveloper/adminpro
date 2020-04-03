import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Graphics', url: '/graphics' },
        { titulo: 'RxJs', url: '/rxjs' },
        { titulo: 'Promises', url: '/promises' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/users' },
        { titulo: 'Hospitales', url: '/hospitals' },
        { titulo: 'Médicos', url: 'doctors' }
      ]
    }
  ];

  constructor() { }
}
