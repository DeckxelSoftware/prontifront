import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-detalle-novedad-rol-pago',
  templateUrl: './ruta-detalle-novedad-rol-pago.component.html',
  styleUrls: ['./ruta-detalle-novedad-rol-pago.component.scss']
})
export class RutaDetalleNovedadRolPagoComponent {
  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
    this.items = [
      {label: 'Novedades menú', routerLink: '/novedades-menu'},
      {label: 'Novedades por tipo'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
