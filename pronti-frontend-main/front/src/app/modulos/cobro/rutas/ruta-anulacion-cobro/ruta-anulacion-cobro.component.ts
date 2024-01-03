import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ruta-anulacion-cobro',
  templateUrl: './ruta-anulacion-cobro.component.html',
  styleUrls: ['./ruta-anulacion-cobro.component.scss']
})
export class RutaAnulacionCobroComponent  {
  items: MenuItem[] = [];

  constructor() {
    this.items = [
      {label: 'Contratos', routerLink: '/contratos'},
      {label: 'Gestión contratos', routerLink: '/contratos/contrato-modulo'},
      {label: 'Anulación cobros'},
    ];
  }

}
