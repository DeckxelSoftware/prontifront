import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api/menuitem';

@Component({
  selector: 'app-ruta-descuentos',
  templateUrl: './ruta-ingresos-descuentos.component.html',
  styleUrls: ['./ruta-ingresos-descuentos.component.scss']
})
export class RutaIngresosDescuentosComponent {
  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Descuentos'},
    ];
    // this.home = {icon: 'pi pi-home', routerLink: '/'};
  }
}
