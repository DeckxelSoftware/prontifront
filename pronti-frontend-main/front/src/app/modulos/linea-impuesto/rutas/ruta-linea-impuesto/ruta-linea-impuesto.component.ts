import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ruta-linea-impuesto',
  templateUrl: './ruta-linea-impuesto.component.html',
  styleUrls: ['./ruta-linea-impuesto.component.scss']
})
export class RutaLineaImpuestoComponent {
  items: MenuItem[] = [];

  constructor() {
    this.items = [
      {label: 'Recursos', routerLink: '/configuraciones/recursos-modulo'},
      {label: 'Impuestos'},
    ];
  }

}
