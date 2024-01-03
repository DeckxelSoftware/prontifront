import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-area',
  templateUrl: './ruta-area.component.html',
  styleUrls: ['./ruta-area.component.scss']
})
export class RutaAreaComponent {
  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Area'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
