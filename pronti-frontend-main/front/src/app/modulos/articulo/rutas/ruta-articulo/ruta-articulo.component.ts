import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-articulo',
  templateUrl: './ruta-articulo.component.html',
  styleUrls: ['./ruta-articulo.component.scss']
})
export class RutaArticuloComponent implements OnInit{

  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {label:'Bienes', routerLink: '/bienes'},
      {label:'Artículo'},
    ];
    // this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
