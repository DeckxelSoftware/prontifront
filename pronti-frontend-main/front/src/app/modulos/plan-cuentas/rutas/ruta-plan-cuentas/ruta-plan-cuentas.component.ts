import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ruta-plan-cuentas',
  templateUrl: './ruta-plan-cuentas.component.html',
  styleUrls: ['./ruta-plan-cuentas.component.scss']
})
export class RutaPlanCuentasComponent implements OnInit{

  items: MenuItem[] = [];
  constructor() {

  }
  ngOnInit() {
    this.items = [
      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {label: 'Plan cuentas'},
    ];
  }

}
