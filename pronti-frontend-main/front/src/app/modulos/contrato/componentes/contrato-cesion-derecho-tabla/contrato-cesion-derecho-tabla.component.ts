import {Component, Inject, OnInit} from '@angular/core';
import {ContratoCesionDerechoStorageInterface} from '../../interfaces/contrato-cesion-derecho-storage.interface';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {StorageCesionDerechosService} from '../../servicios/storage-cesion-derechos.service';
import {ROWSPERPAGE} from '../../../../constantes/tabla/rows-per-page';
import {Router} from "@angular/router";
import {Dialog} from "primeng/dialog";

@Component({
  selector: 'app-contrato-cesion-derecho-tabla',
  templateUrl: './contrato-cesion-derecho-tabla.component.html',
  styleUrls: ['./contrato-cesion-derecho-tabla.component.scss']
})
export class ContratoCesionDerechoTablaComponent  implements OnInit {


  CONTRATOS_CESION_DERECHOS_STORAGE = 'contratos-cesion-derechos';

  tableData: ContratoCesionDerechoStorageInterface[] = [];
  startingRows =  1;
  totalRecords = 0;
  rowsPerPage = [1,2,3];

  constructor(@Inject(MAT_DIALOG_DATA) public data: ContratoCesionDerechoStorageInterface,
              private _storageCesionDerechoContrato: StorageCesionDerechosService,
              private _router: Router,
              private _dialog: MatDialog) {


  }

  ngOnInit(): void {

    const existeLocalStorage = localStorage.getItem(this.CONTRATOS_CESION_DERECHOS_STORAGE);

    if (existeLocalStorage) {
      const arregloContratos = JSON.parse(localStorage.getItem(this.CONTRATOS_CESION_DERECHOS_STORAGE) || '');
      if (typeof arregloContratos === 'object') {
        this.tableData = [...arregloContratos];
      }
    } else {
      this.tableData = [];
    }
    this.totalRecords = this.tableData.length;
  }

  IrAConfirmar(registro: any) {
    this._router.navigate(['contratos', 'contrato-modulo', registro.modelContratoActual.id, 'cesion-derechos']);
    this._storageCesionDerechoContrato.contratoCesionDerechosAConfirmar = registro;
    this._storageCesionDerechoContrato.vaConfirmar.next(true);
    this._dialog.closeAll();
  }

  lazyLoad(event: { first: number, rows: number }) {
    console.log('eventoLazyLoad', event);
  }
}
