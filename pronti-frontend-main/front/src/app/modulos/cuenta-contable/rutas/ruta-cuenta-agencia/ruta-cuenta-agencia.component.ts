import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ruta-cuenta-agencia',
  templateUrl: './ruta-cuenta-agencia.component.html',
  styleUrls: ['./ruta-cuenta-agencia.component.scss']
})
export class RutaCuentaAgenciaComponent {
  items: MenuItem[] = [];

  constructor() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Cuentas agencias'},
    ];

  }


}
