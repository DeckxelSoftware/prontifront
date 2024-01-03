import {Component, Inject, OnInit} from '@angular/core';
import {PlanResponseDto} from '../../../plan/servicios/dto/plan.response-dto';
import {EstadoContratoService} from '../../../../servicios/estado-contrato/estado-contrato.service';
import {ContratoStorageService} from '../../../../servicios/estado-contrato/contrato-storage.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-plan',
  templateUrl: './modal-plan.component.html',
  styleUrls: ['./modal-plan.component.scss']
})
export class ModalPlanComponent implements OnInit {

  planUno: any = {};
  planDos: any = {};

  constructor(public estadoContratoService: EstadoContratoService,
              public contratoStorageService: ContratoStorageService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    const {planUno, planDos} = this.data;
    this.planUno = planUno;
    this.planDos = planDos;
  }

  mostrarPlanSeleccionado(event: PlanResponseDto) {
    console.log('desde modal', event);

    this.contratoStorageService.calcularIncripcion(event, this.planUno, this.planDos);
    // envia el plan al componente cuota
    this.estadoContratoService.plan.next(event);

  }
}
