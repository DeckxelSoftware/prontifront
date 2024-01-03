import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ruta-transaccion-asiento-contable',
  templateUrl: './ruta-transaccion-asiento-contable.component.html',
  styleUrls: ['./ruta-transaccion-asiento-contable.component.scss']
})
export class RutaTransaccionAsientoContableComponent implements OnInit {


  items: MenuItem[] = [];
  home!: MenuItem;

  idAsientoContable! : number;

  constructor(private _activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    const {idGrupoContable, idSubgrupoContable, idAsientoContable} = this._activatedRouter.snapshot.params;
    this.idAsientoContable = idAsientoContable;
    this.items = [

      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {label: 'Grupo contable', routerLink: '/contabilidad/grupo-contable-modulo'},
      {
        label: 'Subgrupo contable',
        routerLink: `/contabilidad/grupo-contable-modulo/${idGrupoContable}/subgrupo-contable-modulo`
      },

      {
        label: 'Asiento Contable Cabecera',
        routerLink: `/contabilidad/grupo-contable-modulo/${idGrupoContable}/subgrupo-contable-modulo/${idSubgrupoContable}/asiento-contable-cabecera-modulo`
      },
      {
        label: 'Transacción'
      }

    ];
  }

}
