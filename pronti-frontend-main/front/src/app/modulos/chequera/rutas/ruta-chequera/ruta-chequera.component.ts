import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-chequera',
  templateUrl: './ruta-chequera.component.html',
  styleUrls: ['./ruta-chequera.component.scss']
})
export class RutaChequeraComponent implements OnInit{
  items: MenuItem[] = [];
  home!: MenuItem;
  constructor() {
  }
  ngOnInit() {
    this.items = [
      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {label: 'Chequera'},
    ];
    // this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
