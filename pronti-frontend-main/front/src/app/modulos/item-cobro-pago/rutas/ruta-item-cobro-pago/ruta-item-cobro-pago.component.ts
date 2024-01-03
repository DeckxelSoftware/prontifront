import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-item-cobro-pago',
  templateUrl: './ruta-item-cobro-pago.component.html',
  styleUrls: ['./ruta-item-cobro-pago.component.scss']
})
export class RutaItemCobroPagoComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() {
  }

  ngOnInit() {
    this.items = [
      {label: 'Contabilidad', routerLink: '/contabilidad'},
      {label: 'Cuentas por ítem'}
    ]
  }

}
