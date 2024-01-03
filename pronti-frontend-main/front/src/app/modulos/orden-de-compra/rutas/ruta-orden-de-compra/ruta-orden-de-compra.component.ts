import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api/menuitem';

@Component({
  selector: 'app-ruta-orden-de-compra',
  templateUrl: './ruta-orden-de-compra.component.html',
  styleUrls: ['./ruta-orden-de-compra.component.scss']
})
export class RutaOrdenDeCompraComponent {
  items: MenuItem[] = [];

  constructor() {
    this.items = [
      {label: 'Bienes', routerLink: '/bienes'},
      {label: 'Ordenes de compra'},

    ];
    // this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
