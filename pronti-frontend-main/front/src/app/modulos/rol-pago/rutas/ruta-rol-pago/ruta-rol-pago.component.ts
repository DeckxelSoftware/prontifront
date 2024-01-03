import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-rol-pago',
  templateUrl: './ruta-rol-pago.component.html',
  styleUrls: ['./ruta-rol-pago.component.scss']
})
export class RutaRolPagoComponent {
  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Rol pago'},
    ];
  }

}
