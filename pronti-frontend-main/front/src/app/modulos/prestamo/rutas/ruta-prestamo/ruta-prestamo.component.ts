import {Component} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-prestamo',
  templateUrl: './ruta-prestamo.component.html',
  styleUrls: ['./ruta-prestamo.component.scss']
})
export class RutaPrestamoComponent {

  items: MenuItem[] = [];

  constructor() {
    this.items = [
      {label:'Menú Préstamos', routerLink:'/prestamo'},
      {label:'Préstamos'},
    ];
  }

}
