import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api/menuitem';

@Component({
  selector: 'app-ruta-impuesto-renta',
  templateUrl: './ruta-impuesto-renta.component.html',
  styleUrls: ['./ruta-impuesto-renta.component.scss']
})
export class RutaImpuestoRentaComponent {
  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
    this.items = [
      {label: 'Configuraciones', routerLink: '/configuraciones'},
      {label: 'Impuesto renta'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
