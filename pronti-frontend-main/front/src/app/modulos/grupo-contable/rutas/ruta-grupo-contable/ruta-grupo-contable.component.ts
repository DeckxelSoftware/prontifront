import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-grupo-contable',
  templateUrl: './ruta-grupo-contable.component.html',
  styleUrls: ['./ruta-grupo-contable.component.scss']
})
export class RutaGrupoContableComponent implements OnInit{
  items: MenuItem[] = [];
  home!: MenuItem;
  constructor() {
  }
  ngOnInit() {
    this.items = [
      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {label: 'Grupo contable'},
    ];
    // this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
