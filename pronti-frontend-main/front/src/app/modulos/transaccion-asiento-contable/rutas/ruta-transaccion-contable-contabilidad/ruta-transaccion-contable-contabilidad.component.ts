import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-ruta-transaccion-contable-contabilidad',
  templateUrl: './ruta-transaccion-contable-contabilidad.component.html',
  styleUrls: ['./ruta-transaccion-contable-contabilidad.component.scss']
})
export class RutaTransaccionContableContabilidadComponent implements OnInit {


  items: MenuItem[] = [];
  constructor(private _activatedRouter: ActivatedRoute) { }
  idAsientoContable!: number;

  ngOnInit(): void {

    const {idAsientoContable} = this._activatedRouter.snapshot.params;
    this.idAsientoContable = idAsientoContable;

    this.items = [

      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {
        label: 'Asiento contable',
        routerLink: `/contabilidad/asiento-contable-cabecera-modulo/gestion-asiento-contable-contabilidad`
      },
      {
        label: 'Transacción contable'
      }

    ];
  }

}
