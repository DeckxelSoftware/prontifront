import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-rol-permiso',
  templateUrl: './ruta-rol-permiso.component.html',
  styleUrls: ['./ruta-rol-permiso.component.scss']
})
export class RutaRolPermisoComponent implements OnInit {

  idRol = 0;

  items: MenuItem[] = [];
  home!: MenuItem;
  constructor(private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const {idRol} = this._activatedRoute.snapshot.params;
    this.idRol = idRol;

    this.items = [


      {label:'Configuraciones', routerLink: '/configuraciones'},
      {label:'Rol', routerLink: '/configuraciones/rol-modulo'},
      {label:'Permisos rol'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

}
