import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ruta-plan',
  templateUrl: './ruta-plan.component.html',
  styleUrls: ['./ruta-plan.component.scss']
})
export class RutaPlanComponent {
  items: MenuItem[] = [];
  constructor() {
    this.items = [
      {label:'Contratos', routerLink: '/contratos'},
      {label:'Gestión de planes'},
    ];
  }

}
