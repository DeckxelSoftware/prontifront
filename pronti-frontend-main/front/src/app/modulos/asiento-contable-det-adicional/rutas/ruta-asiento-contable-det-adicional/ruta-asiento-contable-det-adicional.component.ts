import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ruta-asiento-contable-det-adicional',
  templateUrl: './ruta-asiento-contable-det-adicional.component.html',
  styleUrls: ['./ruta-asiento-contable-det-adicional.component.scss']
})
export class RutaAsientoContableDetAdicionalComponent implements OnInit{

  items: MenuItem[] = [];
  home!: MenuItem;

  idAsientoContable = 0;
  constructor(private _activatedRouter: ActivatedRoute) {

  }
  ngOnInit() {

    const {idAsientoContable} = this._activatedRouter.snapshot.params;

    this.idAsientoContable = idAsientoContable;
    this.items = [
      {label:'Contabilidad', routerLink: '/contabilidad'},
      {label:'Asiento contable', routerLink: `/contabilidad/asiento-contable-cabecera-modulo/gestion-asiento-contable-contabilidad`},
      {label:'Asiento contable detalle adicional'},

    ];
  }

}
