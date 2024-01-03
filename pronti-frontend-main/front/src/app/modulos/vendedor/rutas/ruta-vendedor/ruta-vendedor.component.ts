import {Component} from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ruta-vendedor',
  templateUrl: './ruta-vendedor.component.html',
  styleUrls: ['./ruta-vendedor.component.scss']
})
export class RutaVendedorComponent {


  items: MenuItem[] = [];
  constructor() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Vendedor'},
    ];
  }

}
