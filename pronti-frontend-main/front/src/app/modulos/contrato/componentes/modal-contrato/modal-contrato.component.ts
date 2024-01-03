import { Component, OnInit } from '@angular/core';
import {ContratoStorageService} from '../../../../servicios/estado-contrato/contrato-storage.service';

@Component({
  selector: 'app-modal-contrato',
  templateUrl: './modal-contrato.component.html',
  styleUrls: ['./modal-contrato.component.scss']
})
export class ModalContratoComponent implements OnInit {

  idContratoInicial = 0;
  cedulaContrato = '';

  constructor(private storageContratoService: ContratoStorageService) { }

  ngOnInit(): void {
    if (this.storageContratoService.contratoInicial.id && this.storageContratoService.contratoInicial.documentoIdentidad){
     this.idContratoInicial = this.storageContratoService.contratoInicial.id;
     this.cedulaContrato = this.storageContratoService.contratoInicial.documentoIdentidad;
    }
  }

}
