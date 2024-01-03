import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api/menuitem';

@Component({
  selector: 'app-ruta-licitacion',
  templateUrl: './ruta-licitacion.component.html',
  styleUrls: ['./ruta-licitacion.component.scss']
})
export class RutaLicitacionComponent {
  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
    this.items = [
      {label: 'Licitación'},
    ];

  }

}
