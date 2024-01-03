import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ruta-reporte-utilidades',
  templateUrl: './ruta-reporte-utilidades.component.html',
  styleUrls: ['./ruta-reporte-utilidades.component.scss']
})
export class RutaReporteUtilidadesComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {

    this.items = [
      { label: 'Personal menú', routerLink: '/personal' },
      { label: 'reportes', routerLink: '/personal/reportes-personal' },
      { label: 'Reporte de utilidades' },
    ];
  }

}
