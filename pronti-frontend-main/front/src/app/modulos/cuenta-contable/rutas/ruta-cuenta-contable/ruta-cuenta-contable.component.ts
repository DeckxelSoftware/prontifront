import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-cuenta-contable',
  templateUrl: './ruta-cuenta-contable.component.html',
  styleUrls: ['./ruta-cuenta-contable.component.scss']
})
export class RutaCuentaContableComponent implements OnInit {
  items: MenuItem[] = [];


  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {label: 'Cuenta contable'},
    ];

  }
}
