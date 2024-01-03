import {Component} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ruta-periodo-laboral',
  templateUrl: './ruta-periodo-laboral.component.html',
  styleUrls: ['./ruta-periodo-laboral.component.scss']
})
export class RutaPeriodoLaboralComponent {

  items: MenuItem[] = [];
  constructor() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Periodo Laboral'},
    ];
  }

}
