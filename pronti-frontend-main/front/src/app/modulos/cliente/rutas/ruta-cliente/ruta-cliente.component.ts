import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-cliente',
  templateUrl: './ruta-cliente.component.html',
  styleUrls: ['./ruta-cliente.component.scss']
})
export class RutaClienteComponent implements OnInit {

  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
  }

  ngOnInit(): void {

    this.items = [
      {label:'Contratos', routerLink: '/contratos'},
      {label:'Clientes'},
    ];
    // this.home = {icon: 'pi pi-home', routerLink: '/'};

  }

}
