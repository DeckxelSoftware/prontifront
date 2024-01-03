import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api/menuitem';

@Component({
  selector: 'app-ruta-region',
  templateUrl: './ruta-region.component.html',
  styleUrls: ['./ruta-region.component.scss']
})
export class RutaRegionComponent {
  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
    this.items = [
      {label: 'Configuraciones', routerLink: '/configuraciones'},
      {label: 'Regiones'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
