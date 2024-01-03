import {Component} from '@angular/core';
import {MenuItem} from "primeng/api/menuitem";

@Component({
  selector: 'app-ruta-recurso',
  templateUrl: './ruta-recurso.component.html',
  styleUrls: ['./ruta-recurso.component.scss']
})
export class RutaRecursoComponent {
  items: MenuItem[] = [];

  constructor() {
    this.items = [
      {label: 'Configuraciones', routerLink: '/configuraciones'},
      {label: 'Recursos'},
    ];
  }

}
