import {Injectable} from '@angular/core';
import {ContratoResponseDto} from '../../modulos/contrato/servicios/dto/contrato.response-dto';
import {Router} from '@angular/router';
import {EstadoContratoModule} from './estado-contrato.module';
import {BehaviorSubject} from 'rxjs';
import {PlanResponseDto} from '../../modulos/plan/servicios/dto/plan.response-dto';

@Injectable({
  providedIn: EstadoContratoModule
})
export class ContratoStorageService {

  contratoInicial: ContratoResponseDto = {};
  contratoUnificar: ContratoResponseDto = {};



  nuevaInscripcion = 0;


  collapsePlan2 = new BehaviorSubject<boolean>(false);
  collapsePlan1 = new BehaviorSubject<boolean>(false);
  seleccionoContrato = new BehaviorSubject<boolean>(false);

  planSeleccionado: any = {};

  constructor(private router: Router) {
  }

  // mostrarPlanSeleccionado(event: PlanResponseDto) {
  //   this.planSeleccionado = event;
  //
  //   if (event.id) {
  //     this.idPlanSeleccionado = event.id;
  //     this.calcularIncripcion(event);
  //   }
  //   console.log('plan selecionado', event);
  // }

  calcularIncripcion(plan: PlanResponseDto, planUno: any, planDos: any) {

    console.log('calculo inscripcion',
      {
        plan3: plan.precio,
        pla3Inscripcion: plan.inscripcion,
        incripcion1: planUno?.inscripcion,
        inscripcion2: planDos?.inscripcion
      });

    if (plan.inscripcion && plan.precio) {
      this.nuevaInscripcion = plan.precio * 0.03 + (plan.inscripcion - planUno.inscripcion - planDos.inscripcion);
    }

  }
}
