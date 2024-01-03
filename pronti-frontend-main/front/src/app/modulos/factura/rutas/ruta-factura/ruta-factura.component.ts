import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-factura',
  templateUrl: './ruta-factura.component.html',
  styleUrls: ['./ruta-factura.component.scss']
})
export class RutaFacturaComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {label: 'Doc. electrónicos menú', routerLink: '/documentos-electronicos'},
      {label: 'Facturas'},
    ];

  }
}
