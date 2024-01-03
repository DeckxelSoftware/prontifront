import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ruta-rol-pago-con-historico',
  templateUrl: './ruta-rol-pago-con-historico.component.html',
  styleUrls: ['./ruta-rol-pago-con-historico.component.scss']
})
export class RutaRolPagoConHistoricoComponent implements OnInit {

  items: MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.items = [
      { label: 'Personal menú', routerLink: '/personal' },
      { label: 'Historico rol' },
    ];
  }

}
