import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-trabajador',
  templateUrl: './ruta-trabajador.component.html',
  styleUrls: ['./ruta-trabajador.component.scss']
})
export class RutaTrabajadorComponent {
  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Trabajadores'},
    ];
  }

}
