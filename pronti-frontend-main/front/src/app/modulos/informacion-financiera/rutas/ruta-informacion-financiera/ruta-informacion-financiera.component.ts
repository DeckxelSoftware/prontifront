import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-informacion-financiera',
  templateUrl: './ruta-informacion-financiera.component.html',
  styleUrls: ['./ruta-informacion-financiera.component.scss']
})
export class RutaInformacionFinancieraComponent {
  items: MenuItem[] = [];

  constructor() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Trabajadores', routerLink: '/personal/trabajadores-modulo'},
      {label: 'Info. financiera'},
    ];
  }

}
