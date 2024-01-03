import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ruta-asiento-contable-cabecera',
  templateUrl: './ruta-asiento-contable-cabecera.component.html',
  styleUrls: ['./ruta-asiento-contable-cabecera.component.scss']
})
export class RutaAsientoContableCabeceraComponent implements OnInit {
  items: MenuItem[] = [];
  home!: MenuItem;

  idSubgrupoContable = 0;

  constructor(private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const {idGrupoContable, idSubgrupoContable} = this._activatedRoute.snapshot.params;
    this.idSubgrupoContable = idSubgrupoContable;

    this.items = [
      {label:'Contabilidad', routerLink: '/contabilidad'},
      {label:'Grupo Contable', routerLink: '/contabilidad/grupo-contable-modulo'},
      {label:'Subgrupo Contable', routerLink: `/contabilidad/grupo-contable-modulo/${idGrupoContable}/subgrupo-contable-modulo`},
      {label:'Asiento contable'},
    ];

  }

}
