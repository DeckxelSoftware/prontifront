import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-grupo',
  templateUrl: './ruta-grupo.component.html',
  styleUrls: ['./ruta-grupo.component.scss']
})
export class RutaGrupoComponent implements OnInit{


  items: MenuItem[] = [];

  constructor() {
  }


  ngOnInit(): void {

    this.items = [
      {label:'Contratos', routerLink: '/contratos'},
      {label:'Grupos'},
    ];

  }

}
