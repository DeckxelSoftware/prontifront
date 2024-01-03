import {Component} from '@angular/core';
import {MenuItem} from "primeng/api/menuitem";

@Component({
  selector: 'app-ruta-sri-gastos',
  templateUrl: './ruta-sri-gastos.component.html',
  styleUrls: ['./ruta-sri-gastos.component.scss']
})
export class RutaSriGastosComponent {
  items: MenuItem[] = [];

  constructor() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Trabajadores', routerLink: '/personal/trabajadores-modulo'},
      {label: 'Gastos SRI'},
    ];

  }

}
