import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ruta-cuentas-por-cobrar',
  templateUrl: './ruta-cuentas-por-cobrar.component.html',
  styleUrls: ['./ruta-cuentas-por-cobrar.component.scss']
})
export class RutaCuentasPorCobrarComponent {
  items: MenuItem[] = [];

  constructor() {
    this.items = [
      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {label: 'Cuentas por cobrar'},
    ];
  }

}
