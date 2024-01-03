import {Component} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ruta-supervisor',
  templateUrl: './ruta-supervisor.component.html',
  styleUrls: ['./ruta-supervisor.component.scss']
})
export class RutaSupervisorComponent {


  items: MenuItem[] = [];
  constructor() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Supervisores'},
    ];
  }

}
