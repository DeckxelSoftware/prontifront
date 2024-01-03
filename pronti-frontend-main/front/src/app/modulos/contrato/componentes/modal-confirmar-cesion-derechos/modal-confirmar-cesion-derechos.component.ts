import {Component, Inject, OnInit} from '@angular/core';
import * as dayjs from "dayjs";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {FORMLY_CONTRATO_READONLY} from "../../funciones/contrato-cesion-derecho-readonly";
import {FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContratoResponseDto} from "../../servicios/dto/contrato.response-dto";
import {HistoricoPlanContratoResponseDto} from '../../../historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}


@Component({
  selector: 'app-modal-confirmar-cesion-derechos',
  templateUrl: './modal-confirmar-cesion-derechos.component.html',
  styleUrls: ['./modal-confirmar-cesion-derechos.component.scss']
})
export class ModalConfirmarCesionDerechosComponent implements OnInit {

  modelContrato: any = {
    numeroDeContrato: '',
    fechaInicio: dayjs().format('YYYY-MM-DD'),
    dsctoInscripcion: 0,
    dsctoPrimeraCuota: 0,
    observacion: '',
    version: 0,
    estado: '',
    cliente: '',
    grupo: '',
    tasaAdministrativa: '',
    inscripcion: 0,
    observacionCesion: '',
    plazoMesSeleccionado: '',
    planSeleccionado: '',
    precioPlanSeleccionado: 0,
    totalMontoCobrado: 0,
    totalCobroPrimeraCuota: 0,
  };

  // primeraCuota = 0;

  fieldsContrato: FormlyFieldConfig[] = FORMLY_CONTRATO_READONLY();

  formContrato = new FormGroup({});

  displayedColumns: string[] = ['position', 'name', 'weight'];

  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'CAPITAL DE SUBSCRIPTOR', weight: 1.0079 },
    {position: 2, name: 'CAPITAL DE SUBSCRIPTOR', weight: 4.0026 },
    {position: 3, name: 'Helium', weight: 6.941 },
  ];
  dataSource = this.ELEMENT_DATA;


  constructor(
    public dialogRef: MatDialogRef<ModalConfirmarCesionDerechosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContratoResponseDto,
  ) {
  }

  ngOnInit(): void {
    this.mostrarDataContrato();
  }


  mostrarDataContrato() {
    let ultimoHistoricoContrato: HistoricoPlanContratoResponseDto = {};
    if (this.data.historicoPlanContratoCollection &&
      this.data.historicoPlanContratoCollection?.length > 0) {
      ultimoHistoricoContrato = this.data.historicoPlanContratoCollection[this.data.historicoPlanContratoCollection.length - 1];
    }

    const objetoInfoExtraContrato = {
      inscripcion: ultimoHistoricoContrato.totalCobroInscripcion || 0,
      cliente: `${this.data.idClienteEnGrupo.idCliente.idUsuario.nombres}  ${this.data.idClienteEnGrupo.idCliente.idUsuario.apellidos}`,
      totalMontoCobrado: ultimoHistoricoContrato.totalMontoCobrado,
      totalCobroPrimeraCuota: ultimoHistoricoContrato.totalCobroPrimeraCuota
    };
    this.modelContrato = {...this.data, ...objetoInfoExtraContrato};
    // if(ultimoHistoricoContrato.cuotaCollection){
    //   this.primeraCuota = ultimoHistoricoContrato.cuotaCollection[0].valorPagadoCuota || 0;
    // }
  }
}
