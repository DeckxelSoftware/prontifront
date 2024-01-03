import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-periodo-contable',
  templateUrl: './ruta-periodo-contable.component.html',
  styleUrls: ['./ruta-periodo-contable.component.scss']
})
export class RutaPeriodoContableComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {label: 'Perido contable'},
    ];

  }
}
