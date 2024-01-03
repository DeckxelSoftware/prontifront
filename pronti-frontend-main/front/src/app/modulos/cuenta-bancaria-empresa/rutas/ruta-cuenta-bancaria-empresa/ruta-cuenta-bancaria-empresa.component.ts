import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-cuenta-bancaria-empresa',
  templateUrl: './ruta-cuenta-bancaria-empresa.component.html',
  styleUrls: ['./ruta-cuenta-bancaria-empresa.component.scss']
})
export class RutaCuentaBancariaEmpresaComponent implements OnInit{

  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {label:'Configuraciones', routerLink: '/configuraciones'},
      {label:'Cuentas Bancarias'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
