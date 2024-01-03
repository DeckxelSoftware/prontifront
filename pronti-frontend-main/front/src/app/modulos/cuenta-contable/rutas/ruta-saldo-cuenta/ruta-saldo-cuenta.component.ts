import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ruta-saldo-cuenta',
  templateUrl: './ruta-saldo-cuenta.component.html',
  styleUrls: ['./ruta-saldo-cuenta.component.scss']
})
export class RutaSaldoCuentaComponent implements OnInit {
  items: MenuItem[] = [];


  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {label: 'Saldos cuentas'},
    ];

  }
}
