import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-rol',
  templateUrl: './ruta-rol.component.html',
  styleUrls: ['./ruta-rol.component.scss']
})
export class RutaRolComponent  implements OnInit{


  items: MenuItem[] = [];
  home!: MenuItem;

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {label:'Configuraciones', routerLink: '/configuraciones'},
      {label:'Rol'},
    ];
  }

}
