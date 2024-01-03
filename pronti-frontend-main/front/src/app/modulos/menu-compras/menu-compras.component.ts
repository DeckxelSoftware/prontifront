import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api/menuitem";

@Component({
  selector: 'app-menu-compras',
  templateUrl: './menu-compras.component.html',
  styleUrls: ['./menu-compras.component.scss']
})
export class MenuComprasComponent {
  items: MenuItem[] = [];

  constructor() {
    this.items = [
      {label: 'Proveedores menú', routerLink: '/proveedores'},
      {label: 'Compras'},

    ];
  }

}
