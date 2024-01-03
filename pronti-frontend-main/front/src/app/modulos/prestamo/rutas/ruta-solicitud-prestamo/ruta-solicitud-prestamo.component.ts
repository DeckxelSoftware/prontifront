import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ruta-solicitud-prestamo',
  templateUrl: './ruta-solicitud-prestamo.component.html',
  styleUrls: ['./ruta-solicitud-prestamo.component.scss']
})
export class RutaSolicitudPrestamoComponent {

  items: MenuItem[] = [];

  constructor() {
    this.items = [
      {label:'Menú Préstamos', routerLink:'/prestamo'},
      {label:'Solicitud Préstamos'},
    ];
  }

}

