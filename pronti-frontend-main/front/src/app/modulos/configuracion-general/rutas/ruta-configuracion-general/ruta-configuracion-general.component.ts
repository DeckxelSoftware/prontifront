import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-configuracion-general',
  templateUrl: './ruta-configuracion-general.component.html',
  styleUrls: ['./ruta-configuracion-general.component.scss']
})
export class RutaConfiguracionGeneralComponent implements OnInit{

  items: MenuItem[] = [];
  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {label:'Configuraciones', routerLink: '/configuraciones'},
      {label:'Configuraciones generales'},
    ];
  }


}
