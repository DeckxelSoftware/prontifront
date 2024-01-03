import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ruta-informe-vacaciones',
  templateUrl: './ruta-informe-vacaciones.component.html',
  styleUrls: ['./ruta-informe-vacaciones.component.scss']
})
export class RutaInformeVacacionesComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'reportes', routerLink: '/personal/reportes-personal'},
      {label: 'Informes de vacaciones'},
    ];
  }

}
