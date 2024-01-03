import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ruta-aprobacion-prestamo',
  templateUrl: './ruta-aprobacion-prestamo.component.html',
  styleUrls: ['./ruta-aprobacion-prestamo.component.scss']
})
export class RutaAprobacionPrestamoComponent {

  items: MenuItem[] = [];

  constructor() {
    this.items = [
      {label: 'Menú Préstamos', routerLink: '/prestamo'},
      {label: 'Solicitud Préstamos', routerLink: '/prestamo/prestamo-modulo/solicitud-prestamo'},
      {label: 'Aprobación Préstamos'}
    ];
  }
}
