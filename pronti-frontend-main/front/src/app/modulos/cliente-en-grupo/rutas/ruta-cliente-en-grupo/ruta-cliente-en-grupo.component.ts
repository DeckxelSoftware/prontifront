import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-cliente-en-grupo',
  templateUrl: './ruta-cliente-en-grupo.component.html',
  styleUrls: ['./ruta-cliente-en-grupo.component.scss']
})
export class RutaClienteEnGrupoComponent implements OnInit{

  items: MenuItem[] = [];


  constructor() {
  }
  ngOnInit(): void {

    this.items = [
      {label:'Inventarios', routerLink: '/inventarios'},
      {label:'Clientes en grupo'},
    ];
  }

}
