import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ruta-consultar-estado-cuenta',
  templateUrl: './ruta-consultar-estado-cuenta.component.html',
  styleUrls: ['./ruta-consultar-estado-cuenta.component.scss']
})
export class RutaConsultarEstadoCuentaComponent implements OnInit {


  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {

    this.items = [
      {label:'Menú Préstamos', routerLink:'/prestamo'},
      {label:'Consultar estado cuenta'},
    ];
  }

}
