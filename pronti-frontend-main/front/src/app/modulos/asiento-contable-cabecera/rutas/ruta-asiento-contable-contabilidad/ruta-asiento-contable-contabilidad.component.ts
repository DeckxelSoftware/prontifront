import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-ruta-asiento-contable-contabilidad',
  templateUrl: './ruta-asiento-contable-contabilidad.component.html',
  styleUrls: ['./ruta-asiento-contable-contabilidad.component.scss']
})
export class RutaAsientoContableContabilidadComponent implements OnInit {


  items: MenuItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Contabilidad', routerLink: '/contabilidad'},
      {label: 'Asiento contable'}
    ]
  }

}
