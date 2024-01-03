import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-cargo-vacacion',
  templateUrl: './ruta-cargo-vacacion.component.html',
  styleUrls: ['./ruta-cargo-vacacion.component.scss']
})
export class RutaCargoVacacionComponent {
  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Trabajadores', routerLink: '/personal/trabajadores-modulo'},
      {label: 'Vacaciones'},
    ];
  }

}
