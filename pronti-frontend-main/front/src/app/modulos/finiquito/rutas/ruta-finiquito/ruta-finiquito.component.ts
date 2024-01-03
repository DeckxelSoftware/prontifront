import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ruta-finiquito',
  templateUrl: './ruta-finiquito.component.html',
  styleUrls: ['./ruta-finiquito.component.scss']
})
export class RutaFiniquitoComponent {
  items: MenuItem[] = [];

  constructor() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Finiquito'},
    ];
  }

}
