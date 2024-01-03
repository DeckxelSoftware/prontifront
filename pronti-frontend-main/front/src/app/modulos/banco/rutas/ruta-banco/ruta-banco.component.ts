import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-banco',
  templateUrl: './ruta-banco.component.html',
  styleUrls: ['./ruta-banco.component.scss']
})
export class RutaBancoComponent implements OnInit{

  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
  }
  ngOnInit(): void {
    this.items = [
      {label:'Configuraciones', routerLink: '/configuraciones'},
      {label:'Banco'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};

  }

}
