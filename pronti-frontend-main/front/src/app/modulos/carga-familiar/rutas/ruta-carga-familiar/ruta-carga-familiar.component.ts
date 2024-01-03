import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-carga-familiar',
  templateUrl: './ruta-carga-familiar.component.html',
  styleUrls: ['./ruta-carga-familiar.component.scss']
})
export class RutaCargaFamiliarComponent {
  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Trabajador', routerLink: '/personal/trabajadores-modulo'},
      {label: 'Carga familiar'},
    ];
    // this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
