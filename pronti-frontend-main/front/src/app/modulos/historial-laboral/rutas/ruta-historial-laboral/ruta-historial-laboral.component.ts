import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-historial-laboral',
  templateUrl: './ruta-historial-laboral.component.html',
  styleUrls: ['./ruta-historial-laboral.component.scss']
})
export class RutaHistorialLaboralComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Trabajadores', routerLink: '/personal/trabajadores-modulo'},
      {label: 'Historial laboral'},
    ];
  }
}
