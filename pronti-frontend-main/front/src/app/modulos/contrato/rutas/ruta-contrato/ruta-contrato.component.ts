import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-contrato',
  templateUrl: './ruta-contrato.component.html',
  styleUrls: ['./ruta-contrato.component.scss']
})
export class RutaContratoComponent implements OnInit {
  items: MenuItem[] = [];


  constructor() {
  }

  ngOnInit(): void {

    this.items = [
      {label: 'Contratos', routerLink: '/contratos'},
      {label: 'Gestión contratos'},

    ];

  }

}
